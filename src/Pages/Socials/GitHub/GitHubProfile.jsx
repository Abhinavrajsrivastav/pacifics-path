import axios from 'axios';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import { FaGithub, FaJava, FaJs, FaPython, FaReact } from 'react-icons/fa';
import { app } from '../../../Components/Firebase/Firebase';
import './GitHubProfile.css';

const GitHubProfile = () => {

//----States GitHub Profile
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [error, setError] = useState('');
  const [devScore, setDevScore] = useState(null);
  const [userRankings, setUserRankings] = useState([]);
  const [bestLanguage, setBestLanguage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

//--Firebase Instance
  const db = getFirestore(app);

//--dev score calculate
    const calculateDevScore = (userData, repos) => {
    const reposCountScore = repos.length / 10;
    const followersScore = userData.followers / 100;
    const totalScore = Math.round((reposCountScore + followersScore) * 10) / 10;
    return totalScore;
  };

//--user profile search button
  const handleSubmit = async (e) => {  
    e.preventDefault();
    setError('');
    setUserData(null);
    setRepos([]);
    setLanguages({});
    setDevScore(null);
    setBestLanguage('');

    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url);
      const sortedRepos = reposResponse.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepos(sortedRepos.slice(0, 5));

      const languagesData = {};
      await Promise.all(
        reposResponse.data.map(async (repo) => {
          try {
            const repoLanguages = await axios.get(repo.languages_url);
            for (const [language, lines] of Object.entries(repoLanguages.data)) {
              if (languagesData[language]) {
                languagesData[language] += lines;
              } else {
                languagesData[language] = lines;
              }
            }
          } catch (error) {
            console.error('Error fetching repo languages:', error);
          }
        })
      );
      setLanguages(languagesData);

      const programmingLanguages = ['Java', 'JavaScript', 'Python', 'TypeScript', 'Kotlin', 'C#', 'C++', 'Ruby', 'Go', 'Rust', 'Swift'];
      const filteredLanguages = Object.keys(languagesData).filter(lang => programmingLanguages.includes(lang));
      const bestLang = filteredLanguages.reduce((a, b) => languagesData[a] > languagesData[b] ? a : b, '');
      setBestLanguage(bestLang);

      const score = calculateDevScore(userResponse.data, sortedRepos);
      setDevScore(score);

      try {
        const querySnapshot = await getDocs(query(collection(db, 'Github-rank'), where('username', '==', username)));
        if (!querySnapshot.empty) {
          return;
        }

        const userDocRef = await addDoc(collection(db, 'Github-rank'), {
          username: username,
          devScore: score,
          bestLanguage: bestLang,
        });

        console.log('User dev score stored in Firestore successfully with ID:', userDocRef.id);
      } catch (error) {
        setError('Error fetching GitHub data. Please try again.');
        console.error('Error storing user data in Firestore:', error);
      }
    } catch (error) {
      setError('Error fetching GitHub data. Please try again.');
      console.error('Error fetching GitHub data:', error);
    }
  };

//--Fetch user Rank
  const fetchUserRankings = async (language = '') => {
    try {
      const q = language
        ? query(collection(db, 'Github-rank'), where('bestLanguage', '==', language))
        : collection(db, 'Github-rank');
      const querySnapshot = await getDocs(q);
      const rankings = [];
      querySnapshot.forEach((doc) => {
        rankings.push(doc.data());
      });
      rankings.sort((a, b) => b.devScore - a.devScore);
      setUserRankings(rankings);
    } catch (error) {
      console.error('Error fetching user rankings:', error);
    }
  };

  useEffect(() => {
    fetchUserRankings(selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
  };


  const renderLanguageIcon = (language) => {
    switch (language) {
      case 'Java':
        return <FaJava />;
      case 'JavaScript':
        return <FaJs />;
      case 'Python':
        return <FaPython />;
      case 'React':
        return <FaReact />;
      default:
        return <FaGithub />;
    }
  };

//--see profile on github
  const handleSeeProfileClick = (username) => {
    window.open(`https://github.com/${username}`, '_blank');
  };

  return (
    <div className="github-profile">
      <div className="profile-header">
        <h1>GitHub Developer <span className="highlight-text">Profile Explorer</span> <span className="code-emoji">💻</span></h1>
        <p className="profile-subtitle">Discover amazing developers and explore their coding journey</p>
      </div>

      <div className="search-sections">
        <form onSubmit={handleSubmit} className="modern-search-form">
          <div className="search-containerr">
            <div className="input-wrapper">
              <FaGithub className="search-icon" />
              <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="search-button" type="submit">
              <span>Explore Profile</span>
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-message">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {userData && (
        <div className="profile-dashboard">
          <div className="profile-overview">
            <div className="profile-card">
              <div className="profile-header-card">
                <div className="avatar-container">
                  <img src={userData.avatar_url} alt="Profile" className="profile-avatar" />
                  <div className="verified-badge">✓</div>
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{userData.name}</h2>
                  <p className="profile-bio">{userData.bio}</p>
                  <div className="username-tag">
                    <FaGithub className="github-icon" />
                    <span>@{userData.login}</span>
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-item repositories">
                  <div className="stat-icon">📁</div>
                  <div className="stat-content">
                    <span className="stat-number">{userData.public_repos}</span>
                    <span className="stat-label">Repositories</span>
                  </div>
                </div>
                <div className="stat-item followers">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <span className="stat-number">{userData.followers}</span>
                    <span className="stat-label">Followers</span>
                  </div>
                </div>
                <div className="stat-item following">
                  <div className="stat-icon">👤</div>
                  <div className="stat-content">
                    <span className="stat-number">{userData.following}</span>
                    <span className="stat-label">Following</span>
                  </div>
                </div>
                {devScore && (
                  <div className="stat-item dev-score">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-content">
                      <span className="stat-number">{devScore}/5</span>
                      <span className="stat-label">Dev Score</span>
                    </div>
                  </div>
                )}
              </div>

              {bestLanguage && (
                <div className="primary-skill">
                  <div className="skill-badge-large">
                    {renderLanguageIcon(bestLanguage)}
                    <span className="skill-name">{bestLanguage}</span>
                    <span className="skill-indicator">🔥</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="repositories-section">
            <div className="section-header">
              <h3>🌟 Top Repositories</h3>
              <span className="repo-count">{repos.length} repositories</span>
            </div>
            <div className="repos-grid">
              {repos.map((repo) => (
                <div key={repo.id} className="modern-repo-card">
                  <div className="repo-header">
                    <h4 className="repo-name">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h4>
                    <div className="repo-stats">
                      <span className="stars">⭐ {repo.stargazers_count}</span>
                      <span className="forks">🍴 {repo.forks_count}</span>
                    </div>
                  </div>
                  <p className="repo-description">{repo.description || 'No description available'}</p>
                  <div className="repo-footer">
                    <div className="repo-language">
                      {repo.language && renderLanguageIcon(repo.language)}
                      <span>{repo.language}</span>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="view-repo-btn">
                      View Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="technologies-section">
            <div className="tech-card">
              <div className="tech-header">
                <h3>💻 Tech Stack & Languages</h3>
                <span className="tech-count">{Object.keys(languages).length} technologies</span>
              </div>
              <div className="tech-grid">
                {Object.entries(languages)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 10)
                  .map(([language, lines]) => (
                    <div key={language} className="tech-item">
                      <div className="tech-info">
                        {renderLanguageIcon(language)}
                        <span className="tech-language">{language}</span>
                      </div>
                      <div className="tech-stats">
                        <span className="lines-count">{lines.toLocaleString()} lines</span>
                        <div className="usage-bar">
                          <div 
                            className="usage-fill" 
                            style={{
                              width: `${(lines / Math.max(...Object.values(languages))) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
