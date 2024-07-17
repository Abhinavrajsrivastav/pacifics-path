import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaTwitter, FaXing, FaStar, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <img src="./Icons/Cat.png" alt="Logo" />
          {/* <FaGoogle  size='25'/> */}
          <span>Educome</span>
        </div>
        <div className="footer-nav">
          <a href="#code">•Code</a>
          <a href="#showcase">•Showcase</a>
          <a href="#impress">•Impress</a>
        </div>
        <div className="footer-copy">
          <p>© 2024 Made with 💙by Abhinav Srivastav</p>
        </div>
        <button className="footer-github-button">
          <FaStar size='25'/>
          Star on GitHub
        </button>
      </div>
      <div className="footer-right">
        <h4>Important Links</h4>
        <ul>
          <li><a href="#contribute">Contribute</a></li>
          <li><a href="#product-hunt">Vote on Product Hunt</a></li>
        </ul>
        <div className="footer-social-icons">
          <a href="https://dribbble.com" aria-label="Dribbble"><FaGithub /></a>
          <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://github.com" aria-label="GitHub"><FaGithub /></a>
          <a href="https://xing.com" aria-label="Xing"><FaXing /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
