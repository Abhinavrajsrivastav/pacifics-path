import React from 'react';
import { useLocation } from 'react-router-dom';
import './WebResponses.css';

function WebResponses() {
    const location = useLocation();
    const searchResults = location.state.searchResults || []; // Provide a default empty array if searchResults is undefined
    console.log('Search Results:', searchResults);

    return (
        <div className="web-response-container">
            <h2>Web Responses</h2>
            <div className="response-list">
                {searchResults.map((result, index) => (
                    <div key={index} className="response-items">
                        <a href={result.link} target="_blank" rel="noopener noreferrer" className="web-result">
                            <img src="../Icons/source-code.png" alt="" />
                            <h3 className="result-title">{result.title}</h3>
                        </a>
                        <p className="result-snippet">{result.snippet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WebResponses;
