import React, { useEffect } from 'react';
import './Vision.css';
import { Link } from 'react-router-dom';
import { gsapAnimations } from '../../../Animations/Gsap';
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaShareAlt, FaRegShareSquare, FaShareSquare } from 'react-icons/fa';

function Vision() {
  // UseEffect hook to run GSAP animations
  useEffect(() => {
    gsapAnimations();
  }, []);

  return (
    <div className="vision-container">
      <div className="centered">
        <div className="icon-container">
          <FaGraduationCap className="vision-icon" />
        </div>
        <p className="brand-names">Educome</p>
        <p className="vision-heading">
          Bring your <span className="vision-learning">learnings</span> to life
        </p>
        <p className="vision-subheading">
          A digital, secure and interactive classroom <br /> where students can learn and share
        </p>
        <Link to="/signup">
          <button className="vision-btn">Start Learning now!</button>
        </Link>
      </div>
    </div>
  );
}

export default Vision;
