import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import LikedQuestionList from '../components/LikedQuestionList';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import axios from 'axios';
import '../style/UserProfilePage.css';

const userURL = process.env.REACT_APP_ENV === 'local'
? 'http://localhost:3001'
: "http://35.198.205.80";

function UserProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async (user) => {
    try {
      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const response = await axios.get(`${userURL}/user`, { params: { 'email': user.email } });
      console.log(response.data);

      setUserData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Use the onAuthStateChanged listener to monitor authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      fetchUserData(user);
    });

    // Return a cleanup function to unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <div className='App-header'>
      <div className="user-profile-header">
      <div className="user-profile-page">
        {userData ? (
          <UserProfile userData={userData} user={user} />
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <div className="liked-questions-div">
        <LikedQuestionList />
      </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
