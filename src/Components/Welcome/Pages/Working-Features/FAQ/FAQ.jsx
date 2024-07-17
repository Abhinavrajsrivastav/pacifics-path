import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    "What is Educome?",
    "Is Educome free to use?",
    "How do I create a dynamic resume on Educome?",
    "What is the Leaderboard feature?",
    "How is the ranking determined on the Leaderboard?",
    "How can I compare my performance with other users on Educome?",
    "How do I provide feedback or suggest features?",
  ];

  return (
   <div className='FAQ-BOX'>
     <div className="faq-container">
      <h2>FAQs</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq}
              <span className="faq-icon">
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
              <p>The answer to the question goes here.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>

  );
};

export default FAQ;
