import React from 'react';
import { useLocation } from 'react-router-dom';
import './WebResponses.css';

function WebResponses() {
    const location = useLocation();
    const searchResults = location.state.searchResults;
    console.log('Search Results:', searchResults);

    return (
        <div className="web-response-container">
            <h2>Web Responses</h2>
            <div className="response-list">
                {searchResults.map((result, index) => (
                    <div key={index} className="response-items">
                        <a href={result.link} target="_blank" rel="noopener noreferrer" className="result">
                            <h3 className="result-title">{result.title}</h3>
                            <p className="result-snippet">{result.snippet}</p>
                            <p className="result-url">{result.link}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WebResponses;
