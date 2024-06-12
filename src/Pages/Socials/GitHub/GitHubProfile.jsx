import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-calendar-heatmap/dist/styles.css';
import { FaJava, FaJs, FaPython } from 'react-icons/fa';
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

      const score = calculateDevScore(userResponse.data, sortedRepos);
      setDevScore(score);

      try {
        // Check if the user already exists in the Firestore collection
        const querySnapshot = await getDocs(query(collection(db, 'Github-rank'), where('username', '==', username)));

        if (!querySnapshot.empty) {
          // If the user already exists, handle the duplicate data scenario
          setError('User already exists in the database.');
          return;
        }

        // If the user doesn't exist, add the new document
        const userDocRef = await addDoc(collection(db, 'Github-rank'), {
          username: username,
          devScore: score
        });

        console.log('User devscore stored in Firestore successfully with ID:', userDocRef.id);
      } catch (error) {
        setError('Error fetching GitHub data. Please try again.');
        console.error('Error storing user data in Firestore:', error);
      }
    } catch (error) {
      setError('Error fetching GitHub data. Please try again.');
      console.error('Error fetching GitHub data:', error);
    }
  };

  const fetchUserRankings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Github-rank'));
    const rankings = [];
    querySnapshot.forEach((doc) => {
      rankings.push(doc.data());
    });
    // Sort the rankings array in descending order based on devScore
    rankings.sort((a, b) => b.devScore - a.devScore);
    setUserRankings(rankings);
  } catch (error) {
    console.error('Error fetching user rankings:', error);
  }
};


  useEffect(() => {
    fetchUserRankings();
  }, []);

  return (
    <div className="github-profile">
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
      {error && <p className="error">{error}</p>}
      {userData && (
        <div className="profile">
          <div className="GitHub-Profile-info">
            <div className="github-box0">
              <img src={userData.avatar_url} alt="Profile" />
              <h1>{userData.name}</h1>
              <p>{userData.bio}</p>
              <div className="details">
              <p>
                <strong>Repos</strong> {userData.public_repos}
              </p>
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
                  <strong>Language:</strong>{' '}
                  {repo.language === 'Java' && <FaJava />}
                  {repo.language === 'JavaScript' && <FaJs />}
                  {repo.language === 'Python' && <FaPython />}
                </p>
              </div>
            ))}
          </div>
          <div className="languages-card">
            <h2>Most Used Languages</h2>
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
     {username&&userRankings.length > 0 && (
  <div className="user-rankings">
    <h2>User Rankings</h2>
    <div className="ranking-list">
            <div className='git-att'>
              <span>profile</span>
       <div className='profile-att'>
            <span>Dev Score</span>
            <span>Rank</span>
          </div>
            </div>
      {userRankings.map((user, index) => (
        <div className="ranking-item" key={index}>
          <div className="profile-infos">
            <img src={`https://github.com/${user.username}.png`} alt="Profile" />
            <div className="user-details">
              <span className="username">{user.username}</span>
            </div>
          </div>
          <span className="dev-score">{user.devScore}</span>
          <span className="rank">{index + 1}</span>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default GitHubProfile;
