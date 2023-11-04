import React from 'react';
import Navbar from '../components/Navbar';
import RedirectIfNotAuthenticated from './RedirectIfNotAuthenticated';

const Layout = ({ children }) => {
  return (
    <div>
      <RedirectIfNotAuthenticated />
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
