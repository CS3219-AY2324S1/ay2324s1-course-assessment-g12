import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarAdmin from '../components/NavbarAdmin';
import RedirectIfInLogin from './RedirectIfInLogin';
import axios from 'axios';
import { auth } from '../firebase-config';

const userUrl = 'http://localhost:3001';

const LoginLayout = ({ children }) => {

  return (
    <div>
        <RedirectIfInLogin /> 
      <div className="content">{children}</div>
    </div>
  );
};

export default LoginLayout;