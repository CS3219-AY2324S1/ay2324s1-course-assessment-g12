import React from 'react';
import LoginSignup from '../components/LoginSignup';
import '../style/LoginPage.css'; // Import the CSS file
import { FaRocket } from 'react-icons/fa'; // Import the rocket icon from a library

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-title">
        <h1>PeerPrep{' '}
          <span role="img" aria-label="rocket">
            🚀
          </span></h1>
        <hr className="divider" />
        <p>Start your coding adventures!</p>
      </div>
      <div className="login-form">
        <LoginSignup />
      </div>
    </div>
  );
};

export default LoginPage;
