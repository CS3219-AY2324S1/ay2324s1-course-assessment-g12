import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import axios from 'axios';

const levelOptions = ['Beginner', 'Intermediate', 'Expert'];
const languageOptions = ['Python', 'Java', 'C'];
const userURL = 'http://localhost:3001';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const handleToggleView = () => {
    setIsLoginView((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginView) {
      try {
        await axios.post(`${userURL}/handleLogin`, { email, password });
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      try {
        const response = await axios.post('${userURL}/checkUserExists', { email, password });

        if (response.data.userExists) {
          console.log('User already exists. Please log in.');
        } else {
            await axios.post(`${userURL}/handleLogin`, {email, password});
          await axios.post(`${userURL}/addUserData`, {
            email,
            password,
            username,
            language,
            level,
          });
          console.log('User signed up successfully.');
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
            sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" }}}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '1em' }}
          />
          <TextField
            sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" }}}
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
                sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" }}}
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
            style={{ marginBottom: '1em', backgroundColor: '#ffff'}}
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
            style={{ marginBottom: '1em', backgroundColor: '#ffff'  }}
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
