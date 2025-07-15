import { useState } from 'react';
import { OpenApi } from '../../Components/Api/OpenApi';
import './Community.css';

const Community = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityDetails, setCommunityDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [testMode, setTestMode] = useState(false); // Add test mode for debugging

  const domains = [
    {
      name: 'Government Exams',
      icon: '🏛️',
      gradient: 'from-blue-600 to-indigo-600',
      communities: ['UPSC CSE', 'SSC CGL', 'Banking (IBPS/SBI)', 'Railway Exams', 'State PSC', 'GATE', 'UPSC ESE', 'NDA/CDS']
    },
    {
      name: 'Engineering Entrance',
      icon: '⚙️',
      gradient: 'from-purple-600 to-pink-600',
      communities: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'COMEDK', 'MHT CET', 'KCET', 'WBJEE']
    },
    {
      name: 'Medical Entrance',
      icon: '🩺',
      gradient: 'from-green-600 to-teal-600',
      communities: ['NEET UG', 'NEET PG', 'AIIMS', 'JIPMER', 'AFMC', 'BDS Entrance', 'AYUSH NEET', 'Nursing Entrance']
    },
    {
      name: 'Management Entrance',
      icon: '�',
      gradient: 'from-orange-600 to-red-600',
      communities: ['CAT', 'XAT', 'GMAT', 'MAT', 'CMAT', 'SNAP', 'NMAT', 'IIFT']
    },
    {
      name: 'Law Entrance',
      icon: '⚖️',
      gradient: 'from-indigo-600 to-purple-600',
      communities: ['CLAT', 'AILET', 'LSAT India', 'BHU LLB', 'DU LLB', 'NLSIU', 'SET Law', 'MH CET Law']
    },
    {
      name: 'Class 12 Boards',
      icon: '�',
      gradient: 'from-cyan-600 to-blue-600',
      communities: ['CBSE Class 12', 'ICSE Class 12', 'State Boards', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Commerce']
    },
    {
      name: 'Class 10 Boards',
      icon: '�',
      gradient: 'from-pink-600 to-rose-600',
      communities: ['CBSE Class 10', 'ICSE Class 10', 'State Boards', 'Science', 'Mathematics', 'Social Science', 'English', 'Hindi']
    },
    {
      name: 'Programming & Tech',
      icon: '💻',
      gradient: 'from-emerald-600 to-green-600',
      communities: ['DSA Practice', 'Web Development', 'Android Development', 'Machine Learning', 'Python', 'Java', 'JavaScript', 'C++']
    },
    {
      name: 'Competitive Programming',
      icon: '🏆',
      gradient: 'from-yellow-600 to-orange-600',
      communities: ['Codeforces', 'CodeChef', 'AtCoder', 'LeetCode', 'HackerRank', 'ICPC', 'Google Contests', 'Microsoft Contests']
    },
    {
      name: 'International Exams',
      icon: '🌍',
      gradient: 'from-violet-600 to-purple-600',
      communities: ['SAT', 'GRE', 'TOEFL', 'IELTS', 'GMAT', 'LSAT', 'MCAT', 'AP Exams']
    },
    {
      name: 'Finance & Banking',
      icon: '💰',
      gradient: 'from-blue-500 to-cyan-500',
      communities: ['CA Foundation', 'CA Inter', 'CA Final', 'CS Executive', 'CMA', 'FRM', 'CFA', 'ACCA']
    },
    {
      name: 'Defense Exams',
      icon: '🛡️',
      gradient: 'from-red-600 to-pink-600',
      communities: ['NDA', 'CDS', 'AFCAT', 'CAPF', 'BSF', 'CRPF', 'Indian Army', 'Indian Navy']
    }
  ];

  const fetchCommunityDetails = async (community) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching details for community:', community);

      // Test mode with mock data
      if (testMode) {
        console.log('Using test mode with mock data');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        const mockData = [
          [`${community} Telegram Study Group`, `Active ${community} preparation group with daily updates, study materials, and doubt clearing sessions.`, 'https://t.me/example', 'telegram'],
          [`${community} Discord Community`, `24/7 active Discord server for ${community} aspirants with voice channels for group study and discussion.`, 'https://discord.gg/example', 'discord'],
          [`${community} WhatsApp Group`, `Join our ${community} WhatsApp group for instant updates, tips, and peer support.`, 'https://chat.whatsapp.com/example', 'whatsapp'],
          [`${community} Slack Workspace`, `Professional ${community} study workspace with organized channels for different topics and resources.`, 'https://slack.com/example', 'slack'],
          [`${community} Reddit Community`, `Browse and discuss ${community} strategies, experiences, and resources with fellow aspirants.`, 'https://reddit.com/r/example', 'reddit'],
          [`${community} Study Circle`, `Exclusive ${community} study circle for serious aspirants with mentorship and guidance.`, 'https://study.example.com', 'study-group']
        ];
        
        setCommunityDetails(mockData);
        return;
      }

      // Enhanced query for exam/study focused communities
      const query = `Find 6 active study communities for ${community} exam preparation. Include Telegram groups, Discord servers, WhatsApp groups, and other platforms where students discuss ${community}. Return in JSON format: [["Community Name", "Description", "Join Link", "Platform Type"]]`;

      console.log('API Query:', query);
      
      // Check if API_KEY is available
      if (!process.env.REACT_APP_Gemini_Key) {
        console.error('API Key not found');
        throw new Error('API configuration missing. Please check your environment variables.');
      }
      
      const response = await OpenApi(query);
      console.log('API Response:', response);
      console.log('Response type:', typeof response);

      // Check for API error responses
      if (response === 'Failed to generate content') {
        throw new Error('API service unavailable');
      }

      // Handle different response formats
      let data;
      if (typeof response === 'string') {
        // Try to clean up the response and extract JSON
        let cleanResponse = response.trim();
        
        // Remove any markdown code blocks
        cleanResponse = cleanResponse.replace(/```json\s*|\s*```/g, '');
        cleanResponse = cleanResponse.replace(/```\s*|\s*```/g, '');
        
        try {
          // Try to parse as JSON
          data = JSON.parse(cleanResponse);
        } catch (parseError) {
          console.log('Failed to parse as JSON, looking for array pattern');
          
          // Try to extract array pattern from the response
          const arrayPattern = /\[\s*\[\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"[^"]+"\s*(?:,\s*"[^"]*")?\s*\]\s*(?:,\s*\[\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"[^"]+"\s*(?:,\s*"[^"]*")?\s*\]\s*)*\]/;
          const arrayMatch = cleanResponse.match(arrayPattern);
          
          if (arrayMatch) {
            try {
              data = JSON.parse(arrayMatch[0]);
            } catch (arrayParseError) {
              console.error('Failed to parse extracted array:', arrayParseError);
              // Try a more lenient approach - split by lines and parse each community
              data = parseResponseManually(cleanResponse, community);
            }
          } else {
            // Fallback: try to parse manually
            data = parseResponseManually(cleanResponse, community);
          }
        }
      } else if (Array.isArray(response)) {
        data = response;
      } else if (response && typeof response === 'object') {
        data = response.data || response.result || response;
      } else {
        throw new Error('Unexpected response type');
      }

      console.log('Processed data:', data);

      if (Array.isArray(data) && data.length > 0) {
        // Validate that each item in the array has the expected structure
        const validData = data.filter(item => 
          Array.isArray(item) && item.length >= 3
        );
        
        if (validData.length === 0) {
          throw new Error('No valid community data found');
        }
        
        setCommunityDetails(validData);
      } else {
        throw new Error('No community data received');
      }
    } catch (error) {
      console.error('Detailed error in fetchCommunityDetails:', error);
      console.error('Error message:', error.message);
      
      // Set a more specific error message based on the error type
      if (error.message.includes('API configuration')) {
        setError('Configuration error: API key is missing. Please contact the administrator.');
      } else if (error.message.includes('API service unavailable')) {
        setError('Service temporarily unavailable. Please try again in a few moments.');
      } else if (error.message.includes('fetch') || error.message.includes('network')) {
        setError('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.message.includes('parse') || error.message.includes('JSON')) {
        setError('Data format error: The server response could not be processed. Please try again.');
      } else if (error.message.includes('No valid')) {
        setError('No communities found for this topic. Please try a different skill or check back later.');
      } else {
        setError(`Failed to load community details: ${error.message}. Please try again later.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to manually parse response when JSON parsing fails
  const parseResponseManually = (response, community) => {
    const lines = response.split('\n').filter(line => line.trim());
    const communities = [];
    
    // Try to extract community information from text
    for (let i = 0; i < Math.min(6, lines.length); i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('Here') && !line.startsWith('I')) {
        communities.push([
          `${community} Study Group ${i + 1}`,
          line.replace(/^\d+\.\s*/, '') || `Active ${community} preparation community with study resources and peer support.`,
          `https://example.com/${community.toLowerCase().replace(/\s+/g, '')}${i + 1}`,
          'Study Group'
        ]);
      }
    }
    
    // Fallback: create default study communities if parsing fails
    if (communities.length === 0) {
      const platforms = ['Telegram', 'Discord', 'WhatsApp', 'Slack', 'Reddit', 'StudyGroup'];
      const descriptions = [
        `Join the most active ${community} Telegram group for daily updates and doubt clearing.`,
        `24/7 Discord server for ${community} aspirants with voice study sessions.`,
        `WhatsApp group for instant ${community} updates and quick discussions.`,
        `Professional Slack workspace for organized ${community} preparation.`,
        `Reddit community for ${community} discussions and experience sharing.`,
        `Exclusive study group for serious ${community} aspirants.`
      ];
      
      for (let i = 0; i < 6; i++) {
        communities.push([
          `${community} ${platforms[i]} Community`,
          descriptions[i],
          `https://example.com/${community.toLowerCase().replace(/\s+/g, '')}${platforms[i].toLowerCase()}`,
          platforms[i]
        ]);
      }
    }
    
    return communities;
  };

  const handleCommunityClick = (community) => {
    console.log('Community clicked:', community); // Debug log
    setSelectedCommunity(community);
    fetchCommunityDetails(community);
  };

  // Get all communities for stats
  const getAllCommunities = () => {
    return domains.flatMap(domain => 
      domain.communities.map(community => ({
        name: community,
        domain: domain.name,
        domainIcon: domain.icon
      }))
    );
  };

  return (
    <div className="community-container">
      {/* Hero Section */}
      <div className="hero-sections">
        <div className="hero-contents">
          <h1 className="community-title">
            📚 Join Study Communities
          </h1>
          <p className="community-subtitle">
            Connect with fellow students, share resources, and achieve your academic goals together
          </p>
          
          {/* Debug Toggle Button */}
          <div className="debug-controls">
            <button 
              className={`debug-toggle ${testMode ? 'active' : ''}`}
              onClick={() => setTestMode(!testMode)}
              title={testMode ? 'Switch to Live API' : 'Switch to Test Mode'}
            >
              {testMode ? '🔧 Test Mode' : '🌐 Live Mode'}
            </button>
          </div>
        </div>
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
      </div>

      {/* Topic Selection Info */}
      <div className="topic-info-section">
        <div className="topic-info-container">
          <h2 className="topic-info-title">Choose Your Study Focus</h2>
          <p className="topic-info-subtitle">
            Select any exam or subject below to discover active study groups, get resources, and connect with peers
          </p>
          <div className="topic-stats">
            <div className="stat-item">
              <span className="stat-number">{domains.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{getAllCommunities().length}</span>
              <span className="stat-label">Study Groups</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Active Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Categories */}
      <div className="community-domains">
        {domains.map((domain, index) => (
          <div key={index} className={`community-domain ${domain.gradient}`}>
            <div className="domain-header">
              <span className="domain-icon">{domain.icon}</span>
              <h2 className="domain-title">{domain.name}</h2>
            </div>
            <ul className="community-list">
              {domain.communities.map((community, communityIndex) => (
                <li 
                  key={communityIndex} 
                  className="community-item" 
                  onClick={() => handleCommunityClick(community)}
                >
                  <span className="community-name">{community}</span>
                  <span className="community-arrow">→</span>
                </li>
              ))}
            </ul>
            <div className="domain-overlay"></div>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Discovering amazing communities...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p className="error-text">{error}</p>
          <button 
            className="retry-button"
            onClick={() => selectedCommunity && fetchCommunityDetails(selectedCommunity)}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Community Details */}
      {selectedCommunity && communityDetails.length > 0 && !loading && !error && (
        <div className="community-details">
          <div className="details-header">
            <button 
              className="back-button"
              onClick={() => setSelectedCommunity(null)}
            >
              ← Back
            </button>
            <h2 className="details-title">
              <span className="highlight">{selectedCommunity}</span> Communities
            </h2>
            <p className="details-subtitle">
              Join these amazing communities and start your learning journey
            </p>
          </div>
          
          <div className="community-cards">
            {communityDetails.map((detail, index) => (
              <div key={index} className="community-card">
                <div className="card-header">
                  <div className="card-badge">
                    <span className="platform-icon">🌐</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{detail[0]}</h3>
                  <p className="card-description">{detail[1]}</p>
                  <div className="card-footer">
                    <a 
                      href={detail[2]} 
                      className="join-button" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <span>Join Community</span>
                      <span className="join-icon">🚀</span>
                    </a>
                  </div>
                </div>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
