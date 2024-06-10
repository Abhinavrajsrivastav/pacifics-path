import React from 'react';
import './SelfLearn.css';
import Queries from '../ChatBot/Queries/Queries';

function SelfLearn() {
  return (
        <div className="container-1">
      {/* <div className="explore">
      </div> */}
      <div className="queries">
        <Queries />
      </div>
    </div>
  )
}

export default SelfLearn