import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Books.css';
import { FaBook, FaLink } from 'react-icons/fa';

const Books = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const booksSectionRef = useRef(null);

  const webDevelopmentBooks = [
    { name: 'React.js Projects', emoji: '📖' },
    { name: 'Node.js Development', emoji: '📘' },
    { name: 'Angular Essentials', emoji: '📗' },
    { name: 'Vue.js Mastery', emoji: '📖' },
    { name: 'Frontend Web Development', emoji: '📘' },
    { name: 'Full-stack Development', emoji: '📗' },
    { name: 'Django Web Framework', emoji: '📖' },
    { name: 'Spring Boot Projects', emoji: '📘' },
    { name: 'ASP.NET Core', emoji: '📗' },
    { name: 'Ruby on Rails', emoji: '📖' }
  ];

  const programmingLanguagesBooks = [
    { name: 'JavaScript Programming', emoji: '📖' },
    { name: 'Python Programming', emoji: '📘' },
    { name: 'Java Essentials', emoji: '📗' },
    { name: 'C++ Programming', emoji: '📖' },
    { name: 'Ruby Programming', emoji: '📘' },
    { name: 'Go Programming', emoji: '📗' },
    { name: 'Swift Programming', emoji: '📖' },
    { name: 'R Programming', emoji: '📘' },
    { name: 'PHP Programming', emoji: '📗' },
    { name: 'TypeScript Handbook', emoji: '📖' }
  ];

  const dataScienceBooks = [
    { name: 'Python for Data Science', emoji: '📖' },
    { name: 'Machine Learning Basics', emoji: '📘' },
    { name: 'Deep Learning Fundamentals', emoji: '📗' },
    { name: 'Data Visualization Techniques', emoji: '📖' },
    { name: 'Big Data Analytics', emoji: '📘' },
    { name: 'Natural Language Processing', emoji: '📗' },
    { name: 'Data Mining Algorithms', emoji: '📖' },
    { name: 'Statistics for Data Science', emoji: '📘' },
    { name: 'AI and Machine Learning Applications', emoji: '📗' },
    { name: 'Data Science Projects', emoji: '📖' }
  ];

  const otherDomainsBooks = [
    { name: 'Cybersecurity Essentials', emoji: '📖' },
    { name: 'Cloud Computing Basics', emoji: '📘' },
    { name: 'Blockchain Technology', emoji: '📗' },
    { name: 'IoT Fundamentals', emoji: '📖' },
    { name: 'AR/VR Development', emoji: '📘' },
    { name: 'Game Development', emoji: '📗' },
    { name: 'Mobile App Development', emoji: '📖' },
    { name: 'UI/UX Design Principles', emoji: '📘' },
    { name: 'Digital Marketing Strategies', emoji: '📗' },
    { name: 'Project Management Essentials', emoji: '📖' }
  ];

  const handleSearch = async (searchQuery) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const optimizedBooks = await optimizeDescriptions(response.data.items);
        setBooks(optimizedBooks);
        setError('');
        booksSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError('Failed to fetch books.');
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
    <div className='books-box'>
      <h2>{title}</h2>
      <div className="suggested-themes">
        {themes.map((theme) => (
          <button key={theme.name} className="theme-buttoni" onClick={() => handleThemeClick(theme)}>
            {theme.emoji} {theme.name}
          </button>
        ))}
      </div>
    </div>
  );

  const optimizeDescriptions = async (books) => {
    const optimizedBooks = await Promise.all(
      books.map(async (book) => {
        const description = book.volumeInfo.description ? await ensureEnglishAndOptimize(book.volumeInfo.description) : 'No description available.';
        return { ...book, description };
      })
    );
    return optimizedBooks;
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
    <div className="book-search-container">
      <h1>Book Library</h1>    
      {renderThemes(webDevelopmentBooks, 'Web Development')}
      {renderThemes(programmingLanguagesBooks, 'Programming Languages')}
      {renderThemes(dataScienceBooks, 'Data Science')}
      {renderThemes(otherDomainsBooks, 'Other Domains')}
      
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter book category (e.g., web development, data science)"
        />
        <button onClick={handleButtonClick}>
          Search
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div ref={booksSectionRef} className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.description}</p>
            <div className="book-links">
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                <FaBook />
              </a>
              {book.volumeInfo.previewLink && (
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                  <FaLink />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
