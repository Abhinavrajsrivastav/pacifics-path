import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Gemini.css';
import Bot from '../../../Bot/Bot';

function Gemini() {
  const location = useLocation();
  const geminiResponse = location.state?.geminiResponse || ''; // Provide a default empty string if geminiResponse is undefined
  const query = location.state?.query || ''; // Provide a default empty string if query is undefined
  const sanitizedResponse = geminiResponse.replace(/[*#]/g, ''); // Remove * and # symbols
  console.log('Gemini Response:', sanitizedResponse);

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queryHistory, setQueryHistory] = useState([]); // New state for history

  useEffect(() => {
    if (geminiResponse) {
      const interval = setInterval(() => {
        setDisplayedText(geminiResponse.substring(0, currentIndex + 1).replace(/[*#]/g, ''));
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5);

      return () => clearInterval(interval);
    }
  }, [geminiResponse, currentIndex]);

  useEffect(() => {
    if (sanitizedResponse) {
      setQueryHistory((prevHistory) => [
        ...prevHistory,
        { query, response: sanitizedResponse },
      ]);
      setDisplayedText('');
      setCurrentIndex(0);
    }
  }, [sanitizedResponse, query]);

  return (
    <div className="Gemini-response">
      <div className="bgblue">
        <h2>Response</h2>
        <div className="card">
          {queryHistory.map((entry, index) => (
            <div key={index} className="history-entry">
              <div className="response-left">
                {entry.response.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <div className="query-right">
                <p>{entry.query}</p>
              </div>
            </div>
          ))}
          {geminiResponse && (
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
