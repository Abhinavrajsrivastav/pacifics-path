import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Projects.css';
import { FaGithub, FaLink, FaYoutube } from 'react-icons/fa';

const Projects = () => {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const projectsSectionRef = useRef(null);

  const webDevelopmentProjects = [
    { name: 'E-commerce Website', emoji: '🛒' },
    { name: 'Currency Converter', emoji: '💱' },
    { name: 'Music Application', emoji: '🎵' },
    { name: 'Blog Platform', emoji: '✍️' },
    { name: 'Social Media Dashboard', emoji: '📊' },
    { name: 'Project Management Tool', emoji: '📋' },
    { name: 'Real-time Chat Application', emoji: '💬' },
    { name: 'Travel Booking Website', emoji: '🌍' },
    { name: 'Job Portal', emoji: '💼' },
    { name: 'Weather App', emoji: '🌤️' },
    { name: 'Online Learning Platform', emoji: '📚' },
    { name: 'Event Management System', emoji: '🎉' },
    { name: 'Recipe App', emoji: '🍽️' },
    { name: 'Fitness Tracker', emoji: '🏃' },
    { name: 'Inventory Management System', emoji: '📦' },
  ];

  const programmingLanguagesProjects = [
    { name: 'Java Banking System', emoji: '🏦' },
    { name: 'Python Web Scraper', emoji: '🕷️' },
    { name: 'JavaScript Game Engine', emoji: '🎮' },
    { name: 'C++ Algorithm Visualizer', emoji: '🔧' },
    { name: 'Ruby Inventory Management', emoji: '📦' },
    { name: 'Go REST API', emoji: '🔗' },
    { name: 'Rust Blockchain', emoji: '⛓️' },
    { name: 'Kotlin Weather App', emoji: '🌦️' },
    { name: 'Swift iOS App', emoji: '📱' },
    { name: 'PHP Content Management System', emoji: '🖥️' },
    { name: 'TypeScript React Components Library', emoji: '⚛️' },
    { name: 'Scala Finance Application', emoji: '💸' },
    { name: 'Perl Automation Script', emoji: '🤖' },
    { name: 'Haskell AI Algorithm', emoji: '🧠' },
    { name: 'Elixir Real-time Chat App', emoji: '💬' },
  ];

  const dataScienceProjects = [
    { name: 'ML Stock Predictor', emoji: '📈' },
    { name: 'Data Science Dashboard', emoji: '📊' },
    { name: 'Deep Learning Image Classifier', emoji: '🧠' },
    { name: 'AI Chatbot', emoji: '🤖' },
    { name: 'NLP Sentiment Analyzer', emoji: '🗣️' },
    { name: 'Data Visualization Tool', emoji: '📉' },
    { name: 'Big Data Processing System', emoji: '💾' },
    { name: 'Statistical Analysis App', emoji: '📉' },
    { name: 'Machine Learning Model Deployment', emoji: '🚀' },
    { name: 'Genetic Algorithm Optimization', emoji: '🧬' },
    { name: 'Time Series Forecasting', emoji: '⏳' },
    { name: 'Computer Vision Application', emoji: '👁️' },
    { name: 'Reinforcement Learning Agent', emoji: '🤖' },
    { name: 'Bioinformatics Tool', emoji: '🧬' },
    { name: 'AI-driven Recommendation System', emoji: '📚' },
  ];

  const otherDomainsProjects = [
    { name: 'Android Fitness Tracker', emoji: '🏃' },
    { name: 'iOS Recipe App', emoji: '🍲' },
    { name: 'Cloud File Storage', emoji: '☁️' },
    { name: 'Blockchain Voting System', emoji: '🗳️' },
    { name: 'UI/UX Design Tool', emoji: '🎨' },
    { name: 'Cybersecurity Scanner', emoji: '🔒' },
    { name: 'DevOps CI/CD Pipeline', emoji: '🚀' },
    { name: 'Game Development Platform', emoji: '🎮' },
    { name: 'Virtual Reality Experience', emoji: '🕶️' },
    { name: 'Augmented Reality App', emoji: '📱' },
    { name: 'Digital Marketing Analytics', emoji: '📈' },
    { name: 'IoT Smart Home System', emoji: '🏠' },
    { name: 'Robotics Automation Software', emoji: '🤖' },
    { name: 'Environmental Monitoring System', emoji: '🌍' },
    { name: 'Legal Document Automation', emoji: '⚖️' },
  ];

  const handleSearch = async (searchQuery) => {
    const url = `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const optimizedProjects = await optimizeDescriptions(response.data.items);
        setProjects(optimizedProjects);
        setError('');
        projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('Failed to fetch projects.');
      }
    } catch (err) {
      console.error('Error fetching data from API:', err);
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        setError('No response received from server. Please check your network connection.');
      } else {
        setError('Error in setting up the request.');
      }
    }
  };

  const handleThemeClick = (theme) => {
    handleSearch(theme.name);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  const renderThemes = (themes, title) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <h2>{title}</h2>
      <div className="suggested-themes">
        {themes.map((theme) => (
          <button key={theme.name} className="theme-button" onClick={() => handleThemeClick(theme)}>
            {theme.emoji} {theme.name}
          </button>
        ))}
      </div>
    </div>
  );

  const optimizeDescriptions = async (projects) => {
    const optimizedProjects = await Promise.all(
      projects.map(async (project) => {
        const description = project.description ? await ensureEnglishAndOptimize(project.description) : 'No description available.';
        return { ...project, description };
      })
    );
    return optimizedProjects;
  };

  const ensureEnglishAndOptimize = async (description) => {
    // Dummy language detection and translation logic for illustration
    const language = detectLanguage(description); // This function should detect the language of the description

    if (language !== 'en') {
      description = await translateToEnglish(description); // This function should translate the description to English
    }

    const optimizedDescription = await optimizeWithGemini(description); // This function should call the Gemini API to optimize the description
    return optimizedDescription;
  };

  const detectLanguage = (text) => {
    // Dummy function: always returns 'en'
    return 'en';
  };

  const translateToEnglish = async (text) => {
    // Dummy function: assumes the text is already in English
    return text;
  };

  const optimizeWithGemini = async (text) => {
    // Dummy function: returns the text with "(optimized)" appended
    return text + ' (optimized)';
  };

  return (
    <div className="project-search-container">
      <div className='Project-con'>
        <h1>Project Portfolio</h1>

      {renderThemes(webDevelopmentProjects, 'Web Development')}
      {renderThemes(programmingLanguagesProjects, 'Programming Languages')}
      {renderThemes(dataScienceProjects, 'Data Science')}
      {renderThemes(otherDomainsProjects, 'Other Domains')}

      <div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="project-search-input"
          placeholder="Enter project type (e.g., web, data science)"
        />
        <button onClick={handleButtonClick} className="project-search-button">
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div ref={projectsSectionRef} className="projects-container">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="project-links">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                  <FaLink />
                </a>
              )}
              {project.youtubeUrl && (
                <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Projects;
