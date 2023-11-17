import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase-config';

const userURL = 'http://user:3001';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


function RedirectIfInLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('HELLo')
    // Use onAuthStateChanged to listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigate('/Home'); 
      } else {
        console.log('hello')
        // User is signed out. Redirect to the login page.
        navigate('/LoginPage');
      }
    });

    // Return a cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return null; // Since this component is for redirection only, return null
}

export default RedirectIfInLogin;
