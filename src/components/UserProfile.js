import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase-config'; 

const userURL = 'http://localhost:3001';

function UserProfile() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error("No user logged in.");
        return;
      }
      console.log('Username:', user.email);
      const response = await axios.get(`${userURL}/getUser`, {params: {'email': user.email}});
      console.log(response.data)
      
      setUserData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Run only once on component mount

  return (
    <div>
      <h1>User Profile</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          {/* Display other user information here */}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
