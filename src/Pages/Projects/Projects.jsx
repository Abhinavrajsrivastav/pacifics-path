import axios from 'axios';
import { useRef, useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { OpenApi } from '../../Components/Api/OpenApi';
import './Projects.css';

const Projects = () => {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const projectsSectionRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const webDevelopmentProjects = [
    { name: 'E-commerce App', emoji: '🛒' },
    { name: 'LMS', emoji: 'Ⓜ️' },
    { name: 'News App', emoji: '📰' },
    { name: 'Music player', emoji: '📻' },
    { name: 'Digital Co2 Footprint', emoji: '♻️' },
    { name: 'Global Warning', emoji: '🌤️' },
    { name: 'Real-time Chat App', emoji: '💬' },
    { name: 'Travel Booking Website', emoji: '🌍' },
    { name: 'Job Portal', emoji: '💼' },
    { name: 'Project Searching', emoji: '🔎' },
    { name: 'Event Management App', emoji: '🎉' },
    { name: 'Recipe suggestion', emoji: '🍽️' },
    { name: 'Fitness Tracker', emoji: '🏃' },
  ];

  const programmingLanguagesProjects = [
    { name: 'Banking System', emoji: '🏦' },
    { name: 'Web Scraper', emoji: '🕷️' },
    { name: 'JavaScript Game Engine', emoji: '🎮' },
    { name: 'C++ Algorithm Visualizer', emoji: '🔧' },
    { name: 'Ruby Inventory Management', emoji: '📦' },
    { name: 'Go REST API', emoji: '🔗' },
    { name: 'Rust Blockchain', emoji: '⛓️' },
    { name: 'Swift iOS App', emoji: '📱' },
    { name: 'PHP Content Management System', emoji: '🖥️' },
    { name: 'TypeScript React Components Library', emoji: '⚛️' },
    { name: 'Scala Finance Application', emoji: '💸' },
    { name: 'Perl Automation Script', emoji: '🤖' },
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
    { name: 'Sign Language Detection', emoji: '🔎' },
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

  const[webDevelopment, setWebDevelopment] = useState(webDevelopmentProjects);
  const[programmingLanguages, setProgrammingLanguages] = useState(programmingLanguagesProjects);
  const[dataScience, setDataScience] = useState(dataScienceProjects);
  const[otherDomains, setOtherDomains] = useState(otherDomainsProjects);

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

  const getSomeMoreProject = async (themes,setProjects,title) => {
  const prompt = `Give me a list of ${themes} projects specifically oriented in ${title} in the format of an array like this: ["🎵Music Player", "🙊E-commerce",..etc]. Just give me the project array, nothing else.`;

  try {
    const response = await OpenApi(prompt);
    console.log('Response from OpenApi:', response); 

    let projectsArray;

    if (Array.isArray(response)) {
      projectsArray = response;
    } else{
      projectsArray = JSON.parse(response);
    }

    const newProjects = projectsArray.map(projectName => ({ name: projectName}));

    setProjects(themes => [...themes,...newProjects]);

  } catch (error) {
    console.error('Error fetching additional projects:', error);
    setError('Error fetching additional projects. Please try again.');
  }
};


  const renderThemes = (themes, title, setProjects) => (
    <div className='projects-category'>
      <div className="category-header">
        <div className="category-title">
          <h2>{title}</h2>
          <div className="category-icon">
            {title === 'Web Development' && '🌐'}
            {title === 'Programming Languages' && '💻'}
            {title === 'Data Science' && '📊'}
            {title === 'Other Domains' && '🚀'}
          </div>
        </div>
        <div className="projects-count">{themes.length} projects</div>
      </div>
      <div className="themed-projects-grid">
        {themes.map((theme) => (
          <button 
            key={theme.name} 
            className="modern-theme-button" 
            onClick={() => handleThemeClick(theme)}
          >
            <div className="theme-emoji">{theme.emoji}</div>
            <span className="theme-name">{theme.name}</span>
            <div className="theme-arrow">→</div>
          </button>
        ))}
        <button 
          className="see-more-button" 
          onClick={() => getSomeMoreProject(themes, setProjects, title)}
        >
          <div className="plus-icon">+</div>
          <span>Discover More</span>
        </button>
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

    const paginate = (projects) => {
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    return projects.slice(indexOfFirstProject, indexOfLastProject);
  };

   const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="project-search-container">
      <div className="projects-heroo">
        <div className="hero-content">
          <h1>Discover <span className="highlight-text">Projects</span></h1>
          <p className="hero-description">
            Find amazing projects to build and showcase your skills
          </p>
          
          <div className="search-sections">
            <div className="search-containerr">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className="modern-search-input"
                placeholder="Search projects..."
              />
              <button onClick={handleButtonClick} className="modern-search-button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        {renderThemes(webDevelopment, 'Web Development', setWebDevelopment)}
        {renderThemes(programmingLanguages, 'Programming Languages', setProgrammingLanguages)}
        {renderThemes(dataScience, 'Data Science', setDataScience)}
        {renderThemes(otherDomains, 'Other Domains', setOtherDomains)}
      </div>

      {projects.length > 0 && (
        <div ref={projectsSectionRef} className="results-section">
          <div className="results-header">
            <h3 className="results-title">🎯 Discovered Projects</h3>
            <div className="results-badge">{projects.length} projects found</div>
          </div>
          
          <div className="projects-grid">
            {paginate(projects).map((project) => (
              <div key={project.id} className="modern-project-card">
                <div className="card-header">
                  <h4 className="project-title">{project.name}</h4>
                  <div className="project-stats">
                    <span className="stars">⭐ {project.stargazers_count}</span>
                    <span className="forks">🍴 {project.forks_count}</span>
                  </div>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.language && (
                    <span className="tech-badge">{project.language}</span>
                  )}
                </div>
                
                <div className="card-actions">
                  <a 
                    href={project.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button primary"
                  >
                    <FaGithub className="action-icon" />
                    <span>View Code</span>
                  </a>
                  {project.homepage && (
                    <a 
                      href={project.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-button secondary"
                    >
                      <FaLink className="action-icon" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {projects.length > projectsPerPage && (
            <div className="modern-pagination">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="pagination-button"
              >
                ← Previous
              </button>
              <div className="page-info">
                <span className="page-indicator">Page {currentPage} of {Math.ceil(projects.length / projectsPerPage)}</span>
              </div>
              <button 
                onClick={nextPage} 
                disabled={currentPage * projectsPerPage >= projects.length}
                className="pagination-button"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="error-notification">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
