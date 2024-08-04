import React, { useState } from 'react';
import './Community.css';
import { OpenApi } from '../../Components/Api/OpenApi';
import { Group } from '@mui/icons-material';

const Community = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityDetails, setCommunityDetails] = useState([]);

  const domains = [
    {
      name: 'Coding',
      communities: ['JavaScript', 'Python', 'Java']
    },
    {
      name: 'Engineering',
      communities: ['Mechanical', 'Electrical', 'Civil']
    },
    {
      name: 'Class 12',
      communities: ['Physics', 'Chemistry', 'Mathematics']
    },
    {
      name: 'Class 10',
      communities: ['Science', 'Math', 'English']
    },
    {
      name: 'Data Science',
      communities: ['Machine Learning', 'Statistics', 'Data Analysis']
    },
    {
      name: 'Web Development',
      communities: ['HTML', 'CSS', 'React']
    },
    {
      name: 'Mobile Development',
      communities: ['iOS', 'Android', 'Flutter']
    },
    {
      name: 'Cloud Computing',
      communities: ['AWS', 'Azure', 'Google Cloud']
    },
    {
      name: 'Cybersecurity',
      communities: ['Ethical Hacking', 'Network Security', 'Cryptography']
    },
    {
      name: 'Artificial Intelligence',
      communities: ['Neural Networks', 'Natural Language Processing', 'Robotics']
    }
  ];

  const fetchCommunityDetails = async (community) => {
    try {
      const query = `give me the ${community} communities only including its description, name, and joining links for platforms like Discord, Slack, and Telegram. I am developing an educational project. give me the result in this format {["platformname", "description", "platformjoinlink","platformimg"]} only, else do not give any single word. please do not give anythings else not a single word.`;
      
      // Fetch data
      const response = await OpenApi(query);
      console.log('Raw API response:', response);

      // Parse response if it's a string
      const data = typeof response === 'string' ? JSON.parse(response) : response;

      console.log('Parsed Community details:', data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setCommunityDetails(data);
      } else {
        console.error('Unexpected data format:', data);
        setCommunityDetails([]);
      }
    } catch (error) {
      console.error('Error fetching community details:', error);
      setCommunityDetails([]);
    }
  };

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
    fetchCommunityDetails(community);
  };

  return (
    <div className="community-container">
      <h1 className="community-title">
        Join a Community <Group style={{ fontSize: '2.5rem', verticalAlign: 'middle', marginLeft: '10px' }} color='white'/>
      </h1>
      <div className="community-domains">
        {domains.map((domain, index) => (
          <div key={index} className="community-domain">
            <h2 className="domain-title">{domain.name}</h2>
            <ul className="community-list">
              {domain.communities.map((community, index) => (
                <li 
                  key={index} 
                  className="community-item" 
                  onClick={() => handleCommunityClick(community)}
                >
                  {community}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {selectedCommunity && communityDetails.length > 0 && (
        <div className="community-details">
          <h2 className="details-title">{selectedCommunity} Communities</h2>
          <div className="community-cards">
            {communityDetails.map((detail, index) => (
              <div key={index} className="community-card">
                {detail[3] ? (
                    <img 
                         src={
                              detail[0] === "Discord" ? "./Community/discord.jpg" :
                              detail[0] === "Slack" ? "./Community/slack.jpeg" : "./Community/telegram.jpg"
                            } 
                        alt={detail[0]} 
                         className="community-card-img" 
                    />

                ) : (
                  <div className="community-card-img-placeholder">No Image</div>
                )}
                <div className="community-card-content">
                  <h3>{detail[0]}</h3>
                  <p>{detail[1]}</p>
                  <a href={detail[2]} target="_blank" rel="noopener noreferrer" className="community-card-link">
                    Join on {detail[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
