import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-calendar-heatmap/dist/styles.css';
import { FaJava, FaJs, FaPython, FaGithub, FaReact } from 'react-icons/fa';
import './GitHubProfile.css';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../Components/Firebase/Firebase';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [error, setError] = useState('');
  const [devScore, setDevScore] = useState(null);
  const [userRankings, setUserRankings] = useState([]);
  const [bestLanguage, setBestLanguage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const db = getFirestore(app);

  const accessToken = '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';

  const calculateDevScore = (userData, repos) => {
    const reposCountScore = repos.length / 10;
    const followersScore = userData.followers / 100;
    const totalScore = Math.round((reposCountScore + followersScore) * 10) / 10;
    return totalScore;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUserData(null);
    setRepos([]);
    setLanguages({});
    setDevScore(null);
    setBestLanguage('');

    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      setUserData(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url, {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });
      const sortedRepos = reposResponse.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
      setRepos(sortedRepos.slice(0, 5));

      const languagesData = {};
      await Promise.all(
        reposResponse.data.map(async (repo) => {
          try {
            const repoLanguages = await axios.get(repo.languages_url, {
              headers: {
                Authorization: `token ${accessToken}`
              }
            });
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

  const handleSeeProfileClick = (username) => {
    window.open(`https://github.com/${username}`, '_blank');
  };

  return (
    <div className="github-profile">
      <div className="app-container">
        <header className="brand-header">
          <h1 className="brand-name">Goog-Co</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="input-field"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="learn-more" type="submit">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">See Profile</span>
            </button>
          </div>
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      {userData && (
        <div className="profile">
          <div className="github-profile-info">
            <div className="github-box0">
              <img src={userData.avatar_url} alt="Profile" />
              <h1>{userData.name}</h1>
              <p>{userData.bio}</p>
              <div className="details">
                <p>Repos {userData.public_repos}</p>
                <p>
                  {userData.followers} <strong>Followers</strong>
                </p>
                <p>
                  {userData.following} <strong>Following</strong>
                </p>
                {devScore && (
                  <p>
                    <strong>Score</strong> {devScore}/5
                  </p>
                )}
                {bestLanguage && (
                  <p>
                    {bestLanguage} {renderLanguageIcon(bestLanguage)} 🔥
                  </p>
                )}
              </div>
            </div>
          </div>
          <h2>Top Repositories</h2>
          <div className="repos">
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <h3>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h3>
                <p>{repo.description}</p>
                <p className="language">
                  <strong>Language:</strong> {repo.language && renderLanguageIcon(repo.language)}
                </p>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="view-repo-button">
                  View Repository
                </a>
              </div>
            ))}
          </div>
          <div className="languages-card">
            <h2>Most Used Languages 🔥</h2>
            <ul>
              {Object.keys(languages).map((language) => (
                <li key={language}>
                  {language}: {languages[language]} lines
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {username && (
        <div className="user-rankings">
          <h2>
            User Rankings 
            <div className='navigate-professinal'>
            <span onClick={() => handleLanguageClick('Java')}> Java</span> 
            <span onClick={() => handleLanguageClick('Python')}> Python</span> 
            <span onClick={() => handleLanguageClick('JavaScript')}> JavaScript</span> 
            <span onClick={() => handleLanguageClick('React')}> React</span>
            <span onClick={() => handleLanguageClick('')}> All</span>
            </div>
          </h2>
          <div className="ranking-list">
            {userRankings.map((user, index) => (
              <div className="ranking-item" key={index}>
                <div className="profile-infos">
                  <div className="user-profile">
                    <img src={`https://github.com/${user.username}.png`} alt="Profile" className="profile-pic" />
                    <p className="username">{user.username}</p>
                  </div>
                  <div className="user-details">
                    <div className="user-detail-card">
                      <div className="user-profile-info">
                        <p className="dev-score">{user.devScore}</p>
                        <p className="label">Score</p>
                      </div>
                      <div className="user-profile-info">
                        <p className="rank">{index + 1}</p>
                        <p className="label">Rank</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="see-profile-link">
                  <p className="top-skills">{user.bestLanguage}</p>
                  <p className="see-profile-text" onClick={() => handleSeeProfileClick(user.username)}>See Profile</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
