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
import  io  from 'socket.io-client';
import { createClient } from '@liveblocks/client';
import MatchingBtn from '../components/MatchingBtn';
import EditorComp from '../components/EditorComp';

function CollaborationPage() {
  // The socket
  const socket = io('http://localhost:3003');

  // Variable to keep track whether match is found or no
  const [isMatchFound, setMatchFound] = useState(false);

  // Room ID
  const [roomJoined, setRoomoJoined] = useState("");

  // Output from compiler
  const [output, setOutput] = useState("");

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
      <div style={{ display: isMatchFound ? "none" : 'flex', height: '100vh' }}>
        <MatchingBtn
          callback={setMatchFound}
          socket={socket}
          setRoomJoined={setRoomoJoined}
        />
      </div>
      <div style={{ display: isMatchFound ? "flex" : 'none', height: '100vh' }}>
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
              { roomJoined && (
                <div style={{display:"flex"}}>
                  <EditorComp
                    roomJoined={roomJoined}
                    setOutput={setOutput}
                  />
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <MessagingBox 
              socket={socket}
              roomJoined={roomJoined}
            />
          </Grid>
          <Grid item xs={9}>
            <Box boxShadow={3} style={{ height: '100%' }}>
            <div>
              <h3>Compiled Result</h3>
              <div>{output}</div>
            </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CollaborationPage;
