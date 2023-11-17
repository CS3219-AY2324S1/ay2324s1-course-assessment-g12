import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarAdmin from '../components/NavbarAdmin';
import RedirectIfInLogin from './RedirectIfInLogin';
import axios from 'axios';
import { auth } from '../firebase-config';

const userUrl = 'http://user:3001';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


const LoginLayout = ({ children }) => {

  return (
    <div>
        <RedirectIfInLogin /> 
      <div className="content">{children}</div>
    </div>
  );
};

export default LoginLayout;