import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import '../style/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const userURL = 'http://localhost:3001';

function UserProfile({ userData, user }) {
  const navigate = useNavigate();
  const [editedLevel, setEditedLevel] = useState('');
  const [editedLanguage, setEditedLanguage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Set the editedLevel and editedLanguage based on userData
    if (userData) {
      setEditedLevel(userData.level);
      setEditedLanguage(userData.language);
    }
  }, [userData]); // Update when userData changes

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const data = {
        level: editedLevel,
        language: editedLanguage,
      }
      // Send a request to update the user's level and language
      const response = await axios.patch(`${userURL}/user`, {
        username: userData.username,
        data: data,
      });

      if (response.status === 200) {
        console.log('User information updated successfully.');
        setIsEditing(false);

      } else {
        console.error('Failed to update user information.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signOutAccount = async () => {
    localStorage.removeItem('accessToken');
    signOut(auth).then(() => {
      console.log('User signed out successfully');
      navigate('/LoginPage');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });

  }
  const handleDeleteAccount = async () => {
    localStorage.removeItem('accessToken');
    try {

      const confirmDelete = window.confirm("Are you sure you want to delete your account?");
      console.log(confirmDelete)
      if (confirmDelete) {
        try {
          //delete from db in firebase admin
          console.log(userData.username)
          const response = await axios.delete(`${userURL}/user`, { params: {username: userData.username}});
          console.log(response);

          // delete user from firebase client side
          user.delete().then(() => {
            console.log('User auth account deleted successfully');
          })
            .catch((error) => {
              console.error('Error deleting user auth account:', error);
            });


          navigate('/LoginPage');

        } catch (error) {
          console.error(error);
        }
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="user-profile-container">

      <div className="profile-picture-placeholder"></div>
      <div className="user-info">
        <p className='user-info-item'>@{userData.username}</p>
        <p className='user-info-item'>{userData.email}</p>
        <p className='user-info-item'>
          Level: {isEditing ? (
            <Select
              value={editedLevel}
              onChange={(e) => setEditedLevel(e.target.value)}
              style={{
                color: 'white',
                maxHeight: '30px'
              }}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Expert">Expert</MenuItem>
            </Select>
          ) : (
            editedLevel
          )}
        </p>
        <p className='user-info-item'>
          Language: {isEditing ? (
            <Select
              value={editedLanguage}
              onChange={(e) => setEditedLanguage(e.target.value)}
              style={{
                color: 'white',
                maxHeight: '30px'
              }}
            >
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          ) : (
            editedLanguage
          )}
        </p>
        <p className='user-info-item'>{userData.role}</p>
        <div className='signout-delete-container'>
          <Button variant="contained" color="secondary" onClick={signOutAccount}>
            Sign Out
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </div>
      <EditIcon
        className="edit-button"
        color="secondary"
        onClick={isEditing ? handleSaveClick : handleEditClick}
      />
    </div>

  );
}

export default UserProfile;
