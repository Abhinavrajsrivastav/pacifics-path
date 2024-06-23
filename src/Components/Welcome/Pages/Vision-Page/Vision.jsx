import React, { useEffect } from 'react';
import './Vision.css';
import { Link } from 'react-router-dom';
import {gsapAnimations} from '../../../Animations/Gsap';

function Vision() {

//-----------------Gsap Vision Animation----------------
  useEffect(() => {
    gsapAnimations();
  }, []);

  return (
    <div className="vision-container">
      <div className="centered">
        <div className="icon-container">
        </div>
        <p className="brand-names">Goocom</p>
        <p className='vision-heading'>Bring your<span className='vision-learning'>learnings</span> to life</p>
        <p className='vision-subheading'>A digital, secure and interactive classroom <br />  where students can learn and share</p>
        <Link to="/signup"><button className='vision-btn'>Start Sharing Your Ideas!</button></Link>
      </div>
    </div>
  );
}

export default Vision;
