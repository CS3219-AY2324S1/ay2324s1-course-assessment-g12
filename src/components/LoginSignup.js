import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import axios from 'axios';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const levelOptions = ['Beginner', 'Intermediate', 'Expert'];
const languageOptions = ['Python', 'Java', 'C'];
const userURL = 'http://localhost:3001';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('Python');
  const [level, setLevel] = useState('Beginner');
  const [isLoginView, setIsLoginView] = useState(true);

  const handleToggleView = () => {
    setIsLoginView((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLoginView && (!username || !language || !level))) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (isLoginView) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await auth.currentUser.getIdToken(true).then((idToken) => {
          localStorage.setItem('accessToken', idToken);
        }).catch((error) => {
          console.log(error);
        });
        
        console.log('User signed in successfully:', userCredential.user);
        navigate('/Home');
      } catch (error) {
        alert('Error logging in: Email or password is incorrect.');
        console.error('Error logging in:', error);
      }
    } else {
      try {
        const responseForEmail = await axios.get(`${userURL}/user/check/email`, { params: { "email": email } });
        const responseForUsername = await axios.get(`${userURL}/user/check/username`, { params: { "username": username } });
        if (responseForEmail.data.emailExists) {
          alert('Email already exists. Please log in.')
        } else if (responseForUsername.data.usernameExists) {
          alert('Username already exists. Please choose another username.');
        } else {
            await axios.post(`${userURL}/user`, {
              "email": email,
              "username": username,
              "language": language,
              "level": level,
              "role": "admin"
            });
          
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         
          await auth.currentUser.getIdToken(true).then((idToken) => {
            localStorage.setItem('accessToken', idToken);
          }).catch((error) => {
            console.log(error);
          });
        
          console.log('User signed up successfully.', userCredential.user);
          navigate('/Home');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: '2em', textAlign: 'center' }}>
        <Typography variant="h4" component="h2">
          {isLoginView ? 'Login' : 'Sign Up'}
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', marginTop: '1em' }} onSubmit={handleSubmit}>
          <TextField
            sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '1em' }}
          />
          <TextField
            sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }}
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '1em' }}
          />
          {!isLoginView && (
            <>
              <TextField
                sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }}
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '1em' }}
              />
              <Select
                label="Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                style={{ marginBottom: '1em', backgroundColor: '#ffff' }}
              >
                {levelOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <Select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ marginBottom: '1em', backgroundColor: '#ffff' }}
              >
                {languageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          <Button variant="contained" color="primary" type="submit">
            {isLoginView ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Typography variant="body1" style={{ marginTop: '1em' }}>
          {isLoginView ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleToggleView}>
            {isLoginView ? 'Sign up here' : 'Login here'}
          </span>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginSignup;
