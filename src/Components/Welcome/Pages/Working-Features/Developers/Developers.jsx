import React from 'react';
import './Developers.css';

function Developers() {
  return (
    <div className="developer-container">
      <span>About Developer</span>
      <div className="about-section">
         <div className="photo-section">
        <img src='./Images/dev-profile.jpg' alt="Developer" />
        </div>
        <div className="about-developer">
        <h2>Abhinav Raj Srivastava</h2>
        <p>Hey! Developers, I am Abhinav Raj Srivastav. Currently a Final Year Student at ABES Engineering College Ghaziabad. I would be very happy to listen any valuable feedback from your side, feel free to write it in the feedback section. As always, Keep Hustling 🤌🚀🧑‍🚀.</p>
          </div>
      </div>
    </div>
  );
}

export default Developers;
