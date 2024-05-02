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
        <span className="Features-Page-Main-Heading">Explore some <span>cool</span> Features</span>
        <span className="Features-Page-SubHeading">Explore our amazing features</span>
      </h1>
      <div className="features-body">
        <FeaturesCard className="features-card" icons={"./Icons/shield.png"} heading={"Secure Environment"} subheading={"A place where you do authentic, relevance and secure knowledge sharing."}/>
        <FeaturesCard className="features-card" icons={"./Icons/aisecure.png"} heading={"AI Monitored"} subheading={"A place where AI will be protector of your chat, resources, and services."}/>
        <FeaturesCard className="features-card" icons={"./Icons/video-camera.png"} heading={"Group study, video call"} subheading={"A place where you can connect, share and learn together on common topics."}/>
        <FeaturesCard className="features-card" icons={"./Icons/send.png"} heading={"Share your learning"} subheading={"A place where you can share your learning and knowledge with your peers."}/>
        <FeaturesCard className="features-card" icons={"./Icons/idea.png"} heading={"Share your idea"} subheading={"A place where you can share your ideas openly."}/>
        <FeaturesCard className="features-card" icons={"./Icons/chat.png"} heading={"Secure and private chat"} subheading={"A place where you can communicate, share, talk at common points in a secure environment."}/>
      </div>
    </div>
  );
}

export default Features;
