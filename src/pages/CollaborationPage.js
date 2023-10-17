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

function CollaborationPage() {
  const [inputValue, setInputValue] = useState('');

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
    <div style={{ display: 'flex', height: '100vh' }}>
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
            <TextField
              style={textFieldStyles}
              variant="outlined"
              fullWidth
              fullLength
              rows={20}
              multiline
              value={inputValue}
              onChange={handleInputChange}
              InputProps={inputProps} // Apply the background color to the input fields
              // sx={{border: 'none',"& fieldset": { border: 'none' },}} //to disable outline
            />
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
  );
}

export default CollaborationPage;
