import React from 'react';
import LoginSignup from '../components/LoginSignup';
import '../style/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-title">
        <h1>PeerPrep</h1>
        <p>Welcome to our platform</p>
      </div>
      <div className="login-form">
        <LoginSignup />
      </div>
    </div>
  );
};

export default LoginPage;
