import React, { useState } from 'react';
import "../style/CollaborationPage.css";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MessagingBox from '../components/MessagingBox';
import MatchingButton from '../components/MatchingButton';

function CollaborationPage() {
  const [inputValue, setInputValue] = useState('');

  const [isMatch, setIsMatch] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Add your code execution logic here
    console.log('Executing code:', inputValue);
  };

  const editorStyles = {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    fontFamily: 'Monospace', // Use a monospaced font for code
    backgroundColor: '#282c34', // Set the background color to dark blue
  };

  const textFieldStyles = {
    height: '100%', // Take up all available space
    width: '100%', // Take up all available space
    outline: false,
    overflowY: 'auto',
    disableUnderline: true
  };

  const inputProps = {
    style: { background: '#282c34', color: 'white' }, // Set the background color to dark blue
  };

  const buttonStyles = {
    borderRadius: '0',
    background: 'red', // Change the button's background color to green
    color: 'white', // Change the text color to white
  };

  const containerStyles = {
    backgroundColor: 'lightgray', // Change the background color of the container
    height: '100vh', // Adjust the height as needed
  };

  return (
    <div>
      <div style={{display: MatchingButton.roomJoined == "" ? "none": "flex"}}>
        <MatchingButton/>
      </div>
      <div style={{ display: MatchingButton.roomJoined == "" ? 'flex' : "none", height: '100vh' }}>
        <Grid container spacing={1} style={containerStyles}>
          
          <Grid item xs={3}>
            <Box boxShadow={3} style={{ height: '100%', width: '100%' }}>
              <Typography variant="h5" component="h2">
                Questions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={9} container justify="flex-end">
            <Box style={editorStyles}>
              <div>
            
              </div>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <MessagingBox />
          </Grid>
          <Grid item xs={9}>
            <Box boxShadow={3} style={{ height: '30%' }}>
            <Typography variant="h5" component="h2">
                Code Execution
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CollaborationPage;
