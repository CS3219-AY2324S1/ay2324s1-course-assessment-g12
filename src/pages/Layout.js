import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const userUrl = 'http://localhost:3001';

const Layout = ({ children }) => {

  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
