import React, { useEffect, useRef } from 'react';
import './Features.css';
import FeaturesCard from './Features-Components/FeaturesCard';
import {Scrollreveal} from '../../../Animations/Scrollreveal';

function Features() {

//-----Scrollreveal Animation----  
  useEffect(() => {
    Scrollreveal();
  }
  , []);

  return (
    <div className="features-page">
      <h1 className="features-page-heading">
        <span className="Features-Page-Main-Heading">Here are some <span>cool</span> Features</span>
        {/* <span className="Features-Page-SubHeading">Explore our amazing features</span> */}
      </h1>
      <div className="features-body">
        <FeaturesCard className="features-card" icons={"./Icons/google-books.png"} heading={"Read Books"} subheading={"A hub for avid readers seeking knowledge from books."}/>
        <FeaturesCard className="features-card" icons={"./Icons/team.png"} heading={"Find Right Mate"} subheading={"A platform to connect with the perfect teammate."}/>
        <FeaturesCard className="features-card" icons={"./Icons/rank.png"} heading={"See Your Ranking"} subheading={"Track your development ranking among peers."}/>
        <FeaturesCard className="features-card" icons={"./Icons/artificial-intelligence.png"} heading={"Learn with AI"} subheading={"Enhance your learning experience with AI assistance."}/>
        <FeaturesCard className="features-card" icons={"./Icons/people.png"} heading={"Learn with Community"} subheading={"Engage and share knowledge within a vibrant community."}/>
        <FeaturesCard className="features-card" icons={"./Icons/google-gemini-icon.png"} heading={"Ask with Gemini"} subheading={"Interact and collaborate securely with Gemini."}/>
        </div>
    </div>
  );
}

export default Features;
