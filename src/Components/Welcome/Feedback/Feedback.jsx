import React, { useState } from 'react';
import './Feedback.css';
import { FaCheck, FaCheckCircle, FaCheckDouble, FaCheckSquare, FaRegCheckCircle } from 'react-icons/fa';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Feedback submitted:', { name, email, message });
    setSubmitted(true);
  };

  return (
    <div className='feedback-box'>
      <div className="feedback-container">
        
        {!submitted&&
        <>
        <span>Feedback</span>
        <div className="feedback-header">
          <h2>We value your feedback</h2>
          <p>Please share your thoughts about our initiative...</p>
        </div></>}
        {submitted ? (
          <div className="feedback-thankyou">
            <FaRegCheckCircle size='50' color='green' />
            <h5>Thank you for your feedback!</h5>
            <p>We appreciate your time and effort in helping us improve our services.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="feedback-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
