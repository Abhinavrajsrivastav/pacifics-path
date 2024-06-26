import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Bot.css';
import { useEffect } from 'react';

const Bot = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [geminiResponse, setGeminiResponse] = useState('');



  const API_KEY = process.env.REACT_APP_GEMINI_APP_KEY;
  const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_KEY;

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };


  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
      );
      return response.data.items;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  const fetchGeminiResponse = async (query) => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContentStream(query+"the response should be effective and efficient and do not use * or # symbols in the response");
      const response = await result.response;
      // const text = await response.text();
      let text = '';
      for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
      }
      return text;
    } catch (error) {
      console.error('Error generating content:', error.response ? error.response.data : error.message);
      return 'Failed to generate content';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Query:', query);

    const searchResults = await fetchSearchResults(query);
    const geminiResponse = await fetchGeminiResponse(query);

    console.log('Search Results:', searchResults);
    console.log('Gemini Response:', geminiResponse);

    setSearchResults(searchResults);
    setGeminiResponse(geminiResponse);

    navigate('/self-learn/response', { state: { searchResults, geminiResponse, query } });
  };

  return (
    <div className="app-container">
      <div className="messageBox">
        <div className="fileUploadWrapper">
          <label htmlFor="file">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
              <circle strokeWidth="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5"></circle>
              <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M167.759 79V259"></path>
              <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M79 167.138H259"></path>
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
            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Bot;
