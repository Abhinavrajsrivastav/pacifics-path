import React from 'react';
import './Queries.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Queries = () => {

  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = 'AIzaSyAwY9jOFq5DpDG-Tp9R1tEbteFvcdv_oAs';
  const SEARCH_ENGINE_ID = 'd3ec914403b414c71'; // Replace this with your actual Search Engine ID

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Query:', query);
    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`);
      console.log(response.data.items);
      navigate('/self-learn/response', { state: { searchResults: response.data.items } });
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

    const handleQuery = (event) => {
    setQuery(event.target.value);
  };
  

  return (
    <div className="app-container">
     <div className="brand-container">
    <span className="brand-name">Eduland</span>
    <span className="brand-slogan">Have a question? ask it !</span>
  </div>
  <div className="messageBox">
  <div className="fileUploadWrapper">
    <label for="file">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
        <circle
          stroke-width="20"
          stroke="#6c6c6c"
          fill="none"
          r="158.5"
          cy="168.5"
          cx="168.5"
        ></circle>
        <path
          stroke-linecap="round"
          stroke-width="25"
          stroke="#6c6c6c"
          d="M167.759 79V259"
        ></path>
        <path
          stroke-linecap="round"
          stroke-width="25"
          stroke="#6c6c6c"
          d="M79 167.138H259"
        ></path>
      </svg>
      <span className="tooltip">Add an image</span>
    </label>
    <input type="file" id="file" name="file" />
  </div>
  <input
    required=""
    placeholder="Write here..."
    type="text"
    id="messageInput"
    value={query}
    onChange={handleQuery}
  />
  <button id="sendButton" onClick={handleSubmit}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
      <path
        fill="none"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
      <path
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="33.67"
        stroke="#6c6c6c"
        d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
      ></path>
    </svg>
  </button>
</div>


    </div>
  );
};

export default Queries;
