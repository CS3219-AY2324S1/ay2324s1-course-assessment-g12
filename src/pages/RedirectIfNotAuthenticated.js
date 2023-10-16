import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userURL = 'http://localhost:3001';

function isAccessTokenExpired(accessToken) {
  try {
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    return expirationTime < Date.now();
  } catch (error) {
    console.error('Error decoding or parsing access token:', error);
    return true; // Treat decoding errors as token expired
  }
}



function RedirectIfNotAuthenticated() {
  const navigate = useNavigate();
  const user = localStorage.getItem('username');
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        navigate('/LoginPage');
      } else if (isAccessTokenExpired(accessToken)) {
        // Access token found but expired, fetch a new access token
        try {
          const response = await axios.post(`${userURL}/token`, { username: user });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
        } catch (error) {
          console.error('Error getting access token:', error);
          navigate('/LoginPage');
          return;  
        }
      }
    };
  
    fetchData();
  }, [navigate, user]);
  

  return null; // Since this component is for redirection only, return null
}

export default RedirectIfNotAuthenticated;
