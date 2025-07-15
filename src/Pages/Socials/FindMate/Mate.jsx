import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FaGithub, FaJava, FaJs, FaPython, FaReact } from 'react-icons/fa';
import { app } from '../../../Components/Firebase/Firebase';
import './Mate.css';

const Mate = () => {
  const [userRankings, setUserRankings] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const db = getFirestore(app);

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
      console.log('User Rankings:', rankings);
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
    <div className="dev-mate">
      <div className="mate-header">
        <h2>Find your <span className='dev-mate-text'>dev mate</span> <span className="rocket-emoji">�</span></h2>
        <p className="mate-subtitle">Connect with talented developers and build amazing projects together</p>
      </div>
      
      <div className="user-rankingss">
        <div className="filter-section">
          <h3 className="filter-title">Filter by Technology</h3>
          <div className='navigate-professionali'>
            <div className={`tech-filter ${selectedLanguage === 'Java' ? 'active' : ''}`} onClick={() => handleLanguageClick('Java')}>
              <FaJava className="tech-icon" />
              <span>Java</span>
            </div>
            <div className={`tech-filter ${selectedLanguage === 'Python' ? 'active' : ''}`} onClick={() => handleLanguageClick('Python')}>
              <FaPython className="tech-icon" />
              <span>Python</span>
            </div>
            <div className={`tech-filter ${selectedLanguage === 'JavaScript' ? 'active' : ''}`} onClick={() => handleLanguageClick('JavaScript')}>
              <FaJs className="tech-icon" />
              <span>JavaScript</span>
            </div>
            <div className={`tech-filter ${selectedLanguage === 'React' ? 'active' : ''}`} onClick={() => handleLanguageClick('React')}>
              <FaReact className="tech-icon" />
              <span>React</span>
            </div>
            <div className={`tech-filter ${selectedLanguage === '' ? 'active' : ''}`} onClick={() => handleLanguageClick('')}>
              <FaGithub className="tech-icon" />
              <span>All</span>
            </div>
          </div>
        </div>

        <div className="rankings-header">
          <h3>Developer Leaderboard</h3>
          <div className="results-count">{userRankings.length} developers found</div>
        </div>

        <div className="ranking-list">
          {userRankings.map((user, index) => (
            <div className="ranking-item" key={index}>
              <div className="rank-badge">
                <span className="rank-number">#{index + 1}</span>
              </div>
              
              <div className="profile-section">
                <div className="user-profile">
                  <div className="profile-pic-container">
                    <img src={`https://github.com/${user.username}.png`} alt="Profile" className="profile-pic" />
                    <div className="online-indicator"></div>
                  </div>
                  <div className="user-info">
                    <h4 className="username">{user.username}</h4>
                    <div className="skill-badge">
                      {renderLanguageIcon(user.bestLanguage)}
                      <span className="skill-text">{user.bestLanguage}</span>
                    </div>
                  </div>
                </div>
                
                <div className="stats-section">
                  <div className="stat-card score-card">
                    <div className="stat-value">{user.devScore}</div>
                    <div className="stat-label">Dev Score</div>
                  </div>
                  <div className="achievement-icon">
                    {index === 0 && <span className="trophy">🏆</span>}
                    {index === 1 && <span className="medal">🥈</span>}
                    {index === 2 && <span className="medal">🥉</span>}
                  </div>
                </div>
              </div>
              
              <div className="action-section">
                <button className="profile-btn" onClick={() => handleSeeProfileClick(user.username)}>
                  <FaGithub className="btn-icon" />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mate;
