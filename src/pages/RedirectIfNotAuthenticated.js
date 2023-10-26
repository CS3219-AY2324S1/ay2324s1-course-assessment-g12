import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userURL = 'http://localhost:3001';


function RedirectIfNotAuthenticated() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        navigate('/LoginPage');
      } else {
        try {
          const uid = await axios.get(`${userURL}/user/verify`, { params: { token: accessToken } });
        } catch (error) {
          console.error('Error verifying ID token:', error);
          navigate('/LoginPage');
        }
      }
    };
  
    fetchData();
  }, [navigate]);
  

  return null; // Since this component is for redirection only, return null
}

export default RedirectIfNotAuthenticated;
