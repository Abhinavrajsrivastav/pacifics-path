import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Gemini.css';
import Bot from '../../../Bot/Bot';

function Gemini() {
  const location = useLocation();
  const navigate = useNavigate();

  const geminiResponse = location.state?.geminiResponse || ''; // Provide a default empty string if geminiResponse is undefined
  const query = location.state?.query || ''; // Provide a default empty string if query is undefined
  const sanitizedResponse = geminiResponse.replace(/[*#]/g, ''); // Remove * and # symbols

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queryHistory, setQueryHistory] = useState([]);
  const [responseHandled, setResponseHandled] = useState(false); // New flag to track if response is handled

  useEffect(() => {
    if (sanitizedResponse && currentIndex < sanitizedResponse.length) {
      const interval = setInterval(() => {
        setDisplayedText((prevText) => sanitizedResponse.substring(0, prevText.length + 1));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5);

      return () => clearInterval(interval);
    }
  }, [sanitizedResponse, currentIndex]);

  useEffect(() => {
    if (sanitizedResponse && query && !responseHandled) {
      setQueryHistory((prevHistory) => [
        ...prevHistory,
        { query, response: sanitizedResponse },
      ]);
      setDisplayedText('');
      setCurrentIndex(0);
      setResponseHandled(true); // Mark response as handled
    }
  }, [sanitizedResponse, query, responseHandled]);

  // Reset responseHandled when query changes
  useEffect(() => {
    setResponseHandled(false);
  }, [query]);

  const navigateToVideosResponse = () => {
    navigate('/self-learn/response/Videos', { state: { query } });
  }

  return (
    <div className="Gemini-response">
      <div className="bgblue">
        <h2>Response {"|"} <span onClick={navigateToVideosResponse}>Videos</span></h2>
        <div className="card">
          {queryHistory.map((entry, index) => (
            <div key={index} className="history-entry">
              {entry.response !== sanitizedResponse && (
                <>
                  <div className="response-left">
                    <img src="./bot.png" alt="" />
                    {entry.response.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <div className="query-right">
                    <p>{entry.query}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          {displayedText && (
            <div className="current-entry">
              <div className="response-left">
                {displayedText.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="query-right">
                <p>{query}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-bot">
        <Bot />
      </div>
    </div>
  );
}

export default Gemini;