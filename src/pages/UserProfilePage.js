import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import UserProfile from '../components/UserProfile';   
import { useState } from 'react';

function UserProfilePage() {

    const [uid, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });

    const handleDeleteAccount = async () => {
            try {
                /*const response = await axios.post(`${backendUrl}/delete-user`, uid); 
                console.log(response);*/
                console.log("Account deleted");
            } catch (error) {
                console.error(error);
            }
    }
    
    return (
      <div className="App">
        <header className="App-header">
        <UserProfile/>
        <Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
            Delete Account
        </Button>
        </header>
      </div>
    );
  }

  export default UserProfilePage;