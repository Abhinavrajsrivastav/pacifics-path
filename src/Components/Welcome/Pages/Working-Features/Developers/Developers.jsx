import React from 'react';
import './Developers.css';

function Developers() {
  return (
    <div className="developer-container">
      <div className="photo-section">
        <img src='./Icons/user.png' alt="Developer" />
      </div>
      <div className="about-section">
        <h2>About the Developer</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.</p>
      </div>
    </div>
  );
}

export default Developers;
