import React, { useState } from 'react';
import axios from 'axios';
import './Books.css';

const Books = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [showMore, setShowMore] = useState(false);

  const suggestedThemes = [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Astronomy',
    'Engineering',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Blockchain',
    'Cybersecurity',
    'Cloud Computing',
    'DevOps',
    'Software Development',
    'Web Development',
    'Mobile App Development',
    'Virtual Reality',
    'Augmented Reality',
    'Operating Systems',
    'Computer Networks',
    'Database Management',
    'Algorithms',
    'Data Structures',
    'Programming Languages',
    'Software Engineering',
    'Web Design',
    'Java',
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'SQL',
    'NoSQL',
    'Docker',
  ];

  const handleSearch = async (searchQuery) => {
    // const apiKey = process.env.REACT_APP_GOOGLE_BOOK_API;
    const apiKey = 12345;
    const refinedQuery = `${searchQuery} subject:education`;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${refinedQuery}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setBooks(response.data.items);
        setError('');
      } else {
        setError('Failed to fetch books.');
      }
    } catch (err) {
      console.error('Error fetching data from Google Books API:', err);
      if (err.response) {
        if (err.response.status === 403) {
          setError('Access forbidden. Please check your API key.');
        } else {
          setError(`Error: ${err.response.status} - ${err.response.data.error.message}`);
        }
      } else if (err.request) {
        setError('No response received from server. Please check your network connection.');
      } else {
        setError('Error in setting up the request.');
      }
    }
  };

  const handleThemeClick = (theme) => {
    handleSearch(theme);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const themesToShow = showMore ? suggestedThemes : suggestedThemes.slice(0, 10);

  return (
    <div className="book-search-container">
      <h1>Book Bank</h1>
      <div className="suggested-themes">
        {themesToShow.map((theme) => (
          <button key={theme} className="theme-button" onClick={() => handleThemeClick(theme)}>
            {theme}
          </button>
        ))}
      </div>
      <button className="read-more-button" onClick={handleToggleShowMore}>
        {showMore ? 'View less' : 'View more'}
      </button>
      <div>
        <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="book-search-input"
        placeholder="Enter educational book type (e.g., NCERT, textbook)"
      />
      <button onClick={handleButtonClick} className="book-search-button">Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.description}</p>
            <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              Read this book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
