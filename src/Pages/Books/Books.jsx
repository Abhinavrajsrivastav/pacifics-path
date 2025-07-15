import axios from 'axios';
import { useRef, useState } from 'react';
import { FaBook, FaLink } from 'react-icons/fa';
import './Books.css';

const Books = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const booksSectionRef = useRef(null);

const webDevelopmentBooks = [
  { name: 'Understanding React.js', emoji: '📖' },
  { name: 'Mastering Node.js', emoji: '📘' },
  { name: 'Angular Fundamentals', emoji: '📗' },
  { name: 'Advanced Vue.js', emoji: '📖' },
  { name: 'Frontend Development Basics', emoji: '📘' },
  { name: 'Full-stack Web Development', emoji: '📗' },
  { name: 'Introduction to Django', emoji: '📖' },
  { name: 'Spring Boot Essentials', emoji: '📘' },
  { name: 'ASP.NET Core Overview', emoji: '📗' },
  { name: 'Ruby on Rails Fundamentals', emoji: '📖' }
];


const programmingLanguagesBooks = [
  { name: 'JavaScript Programming Essentials', emoji: '📖' },
  { name: 'Python Programming Guide', emoji: '📘' },
  { name: 'Java Language Basics', emoji: '📗' },
  { name: 'C++ Programming Techniques', emoji: '📖' },
  { name: 'Ruby Language Overview', emoji: '📘' },
  { name: 'Go Programming Insights', emoji: '📗' },
  { name: 'Swift Programming Fundamentals', emoji: '📖' },
  { name: 'R Language Essentials', emoji: '📘' },
  { name: 'PHP Programming Concepts', emoji: '📗' },
  { name: 'TypeScript Essentials', emoji: '📖' }
];


const dataScienceBooks = [
  { name: 'Python for Data Science Basics', emoji: '📖' },
  { name: 'Introduction to Machine Learning', emoji: '📘' },
  { name: 'Deep Learning Concepts', emoji: '📗' },
  { name: 'Data Visualization Methods', emoji: '📖' },
  { name: 'Big Data Analysis', emoji: '📘' },
  { name: 'Natural Language Processing Fundamentals', emoji: '📗' },
  { name: 'Algorithms for Data Mining', emoji: '📖' },
  { name: 'Statistics in Data Science', emoji: '📘' },
  { name: 'Applications of AI and Machine Learning', emoji: '📗' },
  { name: 'Data Science Techniques', emoji: '📖' }
];


const otherDomainsBooks = [
  { name: 'Cybersecurity Principles', emoji: '📖' },
  { name: 'Cloud Computing Overview', emoji: '📘' },
  { name: 'Blockchain Technology Basics', emoji: '📗' },
  { name: 'Fundamentals of IoT', emoji: '📖' },
  { name: 'AR/VR Development Insights', emoji: '📘' },
  { name: 'Game Development Concepts', emoji: '📗' },
  { name: 'Mobile App Development Basics', emoji: '📖' },
  { name: 'UI/UX Design Fundamentals', emoji: '📘' },
  { name: 'Digital Marketing Essentials', emoji: '📗' },
  { name: 'Project Management Basics', emoji: '📖' }
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
    <div className='books-category'>
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
        <div className="books-count">{themes.length} books</div>
      </div>
      <div className="themed-books-grid">
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
    const language = detectLanguage(description); 

    if (language !== 'en') {
      description = await translateToEnglish(description);
    }

    const optimizedDescription = await optimizeWithGemini(description); 
    return optimizedDescription;
  };

  const detectLanguage = (text) => {
    return 'en';
  };

  const translateToEnglish = async (text) => {
    return text;
  };

  const optimizeWithGemini = async (text) => {
    return text + ' (optimized)';
  };

  return (
    <div className="book-search-container">
      <div className="books-hero">
        <div className="hero-content">
          <h1>Discover <span className="highlight-text">Books</span></h1>
          <p className="hero-description">
            Find amazing books to expand your knowledge and skills
          </p>
          
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className="modern-search-input"
                placeholder="Search books..."
              />
              <button onClick={handleButtonClick} className="modern-search-button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        {renderThemes(webDevelopmentBooks, 'Web Development')}
        {renderThemes(programmingLanguagesBooks, 'Programming Languages')}
        {renderThemes(dataScienceBooks, 'Data Science')}
        {renderThemes(otherDomainsBooks, 'Other Domains')}
      </div>

      {books.length > 0 && (
        <div ref={booksSectionRef} className="results-section">
          <div className="results-header">
            <h3 className="results-title">📚 Discovered Books</h3>
            <div className="results-badge">{books.length} books found</div>
          </div>
          
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="modern-book-card">
                <div className="card-header">
                  <h4 className="book-title">{book.volumeInfo.title}</h4>
                  {book.volumeInfo.authors && (
                    <p className="book-authors">by {book.volumeInfo.authors.join(', ')}</p>
                  )}
                </div>
                
                <p className="book-description">{book.description}</p>
                
                <div className="book-meta">
                  {book.volumeInfo.publishedDate && (
                    <span className="publish-date">📅 {book.volumeInfo.publishedDate}</span>
                  )}
                  {book.volumeInfo.pageCount && (
                    <span className="page-count">📄 {book.volumeInfo.pageCount} pages</span>
                  )}
                </div>
                
                <div className="card-actions">
                  <a 
                    href={book.volumeInfo.infoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button primary"
                  >
                    <FaBook className="action-icon" />
                    <span>View Book</span>
                  </a>
                  {book.volumeInfo.previewLink && (
                    <a 
                      href={book.volumeInfo.previewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-button secondary"
                    >
                      <FaLink className="action-icon" />
                      <span>Preview</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
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

export default Books;
