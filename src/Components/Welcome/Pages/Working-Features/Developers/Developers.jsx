import React from 'react';
import './Developers.css'; 

const developers = [
  {
    id: 1,
    name: 'Abhinav Raj',
    img: 'profile.jpg', 
    quote: 'Passionate about building meaningful software.',
    contribution: 'Frontend Development',
    github: 'johndoe',
    linkedin: 'johndoe',
  },
  {
    id: 2,
    name: 'Jane Smith',
    img: './Icons/user.png', // Replace with actual image URL
    quote: 'Turning ideas into reality, one line of code at a time.',
    contribution: 'Backend Development',
    github: 'janesmith',
    linkedin: 'janesmith',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    img: './Icons/user.png', // Replace with actual image URL
    quote: 'Coding is my passion; excellence is my goal.',
    contribution: 'Full Stack Development',
    github: 'alexjohnson',
    linkedin: 'alexjohnson',
  }
];

const Developers = () => {
  return (
    <div className="developer-section" id="dev">
      <h2>Meet Our Developers</h2>
      <div className="developers-list">
        {developers.map((developer) => (
          <div className="card developer-card">
  <div className="card-border-top">
  </div>
  <div className="img">
    <img src={developer.img} alt="profile" />
  </div>
  <span>{developer.name}</span>
  <p className="job">{developer.contribution}</p>
  <button> {developer.quote}
  </button>
</div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
