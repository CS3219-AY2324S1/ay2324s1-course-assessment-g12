import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarAdmin from '../components/NavbarAdmin';
import RedirectIfNotAdmin from './RedirectIfNotAdmin';
import RedirectIfNotAuthenticated from './RedirectIfNotAuthenticated';
import axios from 'axios';
import { auth } from '../firebase-config';
import CollaborationPage from './CollaborationPage';

const userUrl = 'http://localhost:3001';

const LayoutHome = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMatchFound, setMatchFound] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add an authentication listener to get the user's email
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            console.log('User email:', user.email);
            const response = await axios.get(`${userUrl}/user/authenticate`, { params: { "email": user.email } });
            const isAdmin = response.data;
            console.log('isAdmin:', isAdmin);
            setIsAdmin(isAdmin);
          }
        });

        return () => {
          // Cleanup the listener when the component unmounts
          unsubscribe();
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <RedirectIfNotAuthenticated />
      {isAdmin ? (isMatchFound ? <div></div> : <NavbarAdmin/> ) : (isMatchFound ? <div></div> : <Navbar />)}
      <div className="content"><CollaborationPage setIsMatched={setMatchFound}/></div>
    </div>
  );
};

export default LayoutHome;
