import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import axios from 'axios';
import '../style/UserProfilePage.css';

const userURL = 'http://localhost:3001';

function UserProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  
  const fetchUserData = async () => {

    try {
      const user = auth.currentUser;
      setUser(user);

      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const response = await axios.get(`${userURL}/getUser`, { params: { 'email': user.email } });
      console.log(response.data);

      setUserData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  useEffect(() => {
    fetchUserData();  
  }, []);  

  return (
    <div className="user-profile-page">
      {userData ? (
        <UserProfile userData={userData} user={user} /> 
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserProfilePage;
