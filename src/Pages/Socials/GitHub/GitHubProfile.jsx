import React, { useState } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { FaJava, FaJs, FaPython, FaRocket } from 'react-icons/fa'; // Import icons from React Icons
import './GitHubProfile.css';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [error, setError] = useState('');

  const accessToken = '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'; // Replace with your actual access token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUserData(null);
    setRepos([]);
    setLanguages({});

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

    } catch (error) {
      setError('Error fetching GitHub data. Please try again.');
    }
  };

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
          <button class="learn-more" type="submit">
  <span class="circle" aria-hidden="true">
  <span class="icon arrow"></span>
  </span>
  <span class="button-text">See Profile</span>
</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {userData && (
        <div className="profile">
          <div className='GitHub-Profile-info'>
            <div className='github-box0'>
              <img src={userData.avatar_url} alt="Profile" />
              <h1>{userData.name}</h1>
              <p>{userData.bio}</p>
            </div>
            <div className="details">
              <p><strong>Public Repos:</strong> {userData.public_repos}</p>
              <p><strong>Followers:</strong> {userData.followers}</p>
              <p><strong>Following:</strong> {userData.following}</p>
            </div>
          </div>
          <h2>Top Repositories</h2>
          <div className="repos">
            {repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <h3><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h3>
                <p>{repo.description}</p>
                <p className="language"><strong>Language:</strong> {repo.language === 'Java' && <FaJava />}
                  {repo.language === 'JavaScript' && <FaJs />}
                  {repo.language === 'Python' && <FaPython />}
                  {/* Add more icons for other languages as needed */}
                </p>
              </div>
            ))}
          </div>
          <div className="languages-card">
            <h2>Most Used Languages</h2>
            <ul>
              {Object.keys(languages).map((language) => (
                <li key={language}>{language}: {languages[language]} lines</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default GitHubProfile;
