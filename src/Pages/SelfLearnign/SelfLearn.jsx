import React from 'react';
import './SelfLearn.css';
import Explore from '../ChatBot/Explore/Explore';
import Queries from '../ChatBot/Queries/Queries';

function SelfLearn() {
  return (
        <div className="container-1">
      <div className="explore">
        {/* <Explore /> */}
      </div>
      <div className="queries">
        <Queries />
      </div>
    </div>
  )
}

export default SelfLearn