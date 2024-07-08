import React, { useState } from 'react';
import axios from 'axios';
import './Compare.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faCodeCompare, faFire } from '@fortawesome/free-solid-svg-icons';

const Compare = () => {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [userData1, setUserData1] = useState(null);
  const [userData2, setUserData2] = useState(null);
  const [error, setError] = useState('');

  const accessToken = process.env.REACT_APP_GIT_HUB_ACCESS_TOKEN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const [user1Response, user2Response] = await Promise.all([
        axios.get(`https://api.github.com/users/${username1}`, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        }),
        axios.get(`https://api.github.com/users/${username2}`, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        })
      ]);

      const [repos1Response, repos2Response] = await Promise.all([
        axios.get(user1Response.data.repos_url, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        }),
        axios.get(user2Response.data.repos_url, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        })
      ]);

      const devScore1 = calculateDevScore(user1Response.data, repos1Response.data);
      const devScore2 = calculateDevScore(user2Response.data, repos2Response.data);

      setUserData1({ ...user1Response.data, devScore: devScore1, techStacks: getTechStacks(repos1Response.data) });
      setUserData2({ ...user2Response.data, devScore: devScore2, techStacks: getTechStacks(repos2Response.data) });
    } catch (error) {
      setError('Error fetching GitHub data. Please try again.');
      console.error('Error fetching GitHub data:', error);
    }
  };

  const calculateDevScore = (userData, repos) => {
    // Simple dev score calculation based on followers, repos, and contributions
    return userData.followers + userData.public_repos + repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  };

  const getTechStacks = (repos) => {
    const languageCount = {};
    repos.forEach(repo => {
      if (repo.language) {
        if (languageCount[repo.language]) {
          languageCount[repo.language]++;
        } else {
          languageCount[repo.language] = 1;
        }
      }
    });
    return Object.entries(languageCount).sort((a, b) => b[1] - a[1]).map(([lang, count]) => lang).slice(0, 3);
  };

  const renderComparison = () => {
    if (!userData1 || !userData2) {
      return null;
    }

    return (
      <div className="comparisons">
        <div className="userprofile">
          <img src={userData1.avatar_url} alt="Profile 1" />
          <h2>{userData1.name}</h2>
          <p>{userData1.bio}</p>
          <p className="metric">Followers: {userData1.followers}</p>
          <p className="metric">Repos: {userData1.public_repos}</p>
          <p className="metric">Dev Score: {userData1.devScore}</p>
          <p className="metric">Top Tech Stacks: {userData1.techStacks.join(', ')}</p>
        </div>
        
        <FontAwesomeIcon icon={faFire} className="vs-icon" style={{color: "yellow"}}/>

        <div className="userprofile">
          <img src={userData2.avatar_url} alt="Profile 2" />
          <h2>{userData2.name}</h2>
          <p>{userData2.bio}</p>
          <p className="metric">Followers: {userData2.followers}</p>
          <p className="metric">Repos: {userData2.public_repos}</p>
          <p className="metric">Dev Score: {userData2.devScore}</p>
          <p className="metric">Top Tech Stacks: {userData2.techStacks.join(', ')}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="compare">
      <div className='Compare-Box'>
        <h1>Compare GitHub Users</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub username 1"
            value={username1}
            onChange={(e) => setUsername1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter GitHub username 2"
            value={username2}
            onChange={(e) => setUsername2(e.target.value)}
          />
          <button type="submit">Compare</button>
        </form>
        {error && <p className="error">{error}</p>}
        {renderComparison()}
      </div>
    </div>
  );
};

export default Compare;
