import React from 'react';
import './Developers.css'; 

const developers = [
  {
    id: 1,
    name: 'John Doe',
    img: 'https://via.placeholder.com/20', // Replace with actual image URL
    quote: 'Passionate about building meaningful software.',
    contribution: 'Frontend Development',
    github: 'johndoe',
    linkedin: 'johndoe',
  },
  {
    id: 2,
    name: 'Jane Smith',
    img: 'https://via.placeholder.com/20', // Replace with actual image URL
    quote: 'Turning ideas into reality, one line of code at a time.',
    contribution: 'Backend Development',
    github: 'janesmith',
    linkedin: 'janesmith',
  },
  {
    id: 3,
    name: 'Alex Johnson',
    img: 'https://via.placeholder.com/20', // Replace with actual image URL
    quote: 'Coding is my passion; excellence is my goal.',
    contribution: 'Full Stack Development',
    github: 'alexjohnson',
    linkedin: 'alexjohnson',
  },
  {
    id: 4,
    name: 'Emily Brown',
    img: 'https://via.placeholder.com/20', // Replace with actual image URL
    quote: 'Innovating and iterating with code.',
    contribution: 'UI/UX Design',
    github: 'emilybrown',
    linkedin: 'emilybrown',
  },
  {
    id: 5,
    name: 'Michael Davis',
    img: 'https://via.placeholder.com/20', // Replace with actual image URL
    quote: 'Creating software solutions that make a difference.',
    contribution: 'DevOps Engineering',
    github: 'michaeldavis',
    linkedin: 'michaeldavis',
  },
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
