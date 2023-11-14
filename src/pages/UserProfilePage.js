import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import LikedQuestionList from '../components/LikedQuestionList';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import axios from 'axios';
import QuestionHistory from '../components/QuestionHistory';
import '../style/UserProfilePage.css';

const userURL = 'http://localhost:3001';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;


function UserProfilePage() {
  const [selectedCategory, setSelectedCategory] = useState([]); // Default value
  const [selectedLevel, setSelectedLevel] = useState('All Levels'); // Default value
  const [selectedList, setSelectedList] = useState('List All'); // Default value
  const [selectedPopularity, setSelectedPopularity] = useState('List All'); // Default value

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async (user) => {
    try {
      if (!user) {
        console.error("No user logged in.");
        return;
      }
      
      const response = await axios.get(`${userURL}/user`, { params: { 'email': user.email }, headers: {'Cache-Control': 'no-cache'} });
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
      <div className="user-profile-footer">
        {userData ? (
        <QuestionHistory selectedCategory={selectedCategory} selectedLevel={selectedLevel} selectedList={selectedPopularity} userData={userData}/>)
        : (
          <p>Loading user data...</p>
        )
      }
      </div>
    </div>
  );
}

export default UserProfilePage;
