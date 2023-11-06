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
import '../style/QuestionCard.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { auth } from '../firebase-config';

const userURL = 'http://localhost:3001';

function CollaborationPage() {
  const navigate = useNavigate();
  // The socket
  console.log('Connecting to socket')
  const socket = io('http://localhost:3003');
  console.log('Connected to socket')
  console.log(socket.id)

  // Variable to keep track whether match is found or no
  const [isMatchFound, setMatchFound] = useState(false);

  // Room ID
  const [roomJoined, setRoomoJoined] = useState("");

  // Output from compiler
  const [output, setOutput] = useState("");

  const [inputValue, setInputValue] = useState('');

  const [isMatch, setIsMatch] = useState(false);

  const [question, setQuestion] = useState(null);

  const getRoomJoined = () => {
    return roomJoined;
  }

  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async (user) => {
    try {
      if (!user) {
        console.error("No user logged in.");
        return;
      }

      const response = await axios.get(`${userURL}/user`, { params: { 'email': user.email } });
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Add your code execution logic here
    console.log('Executing code:', inputValue);
  };

  socket.on("compile_result", output => {
    console.log(output)
    setOutput(output)
  })

  const editorStyles = {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: '4px',
    height: '60vh',
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
    height: '95vh', // Adjust the height as needed
  };

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  const handleSubmission = () => {
    socket.emit("submit_question", socket.id, roomJoined);
  };

  socket.on("leave_room", () => {
    navigate('/Home');
  });

  return (
    <div>
      {userData && (
      <div style={{ display: isMatchFound ? "none" : 'flex', height: '100vh' }}>
        <MatchingBtn
          callback={setMatchFound}
          socket={socket}
          setRoomJoined={setRoomoJoined}
          setQuestion={setQuestion}
          userData={userData}
        />
      </div>
      )}
      <div style={{ display: isMatchFound ? "flex" : 'none', height: '93.5vh' }}>
        <Grid container spacing={1} style={containerStyles}>
          <Grid item xs={5}>
            <Box boxShadow={3} style={{ height: '60vh', width: '100%',}}>
              <div className='scrollable-div'>
                    <Typography variant="h5" component="h2">
                      {question && (
                        <div>
                          {question.title}
                        </div>
                      )}
                    </Typography>
                    { question && (
                      <div className="card-content">
                        <div className='tag-div'>
                          {question.categories.map((category, index) => (
                            <div key={index}>{category}</div>
                          ))}
                        </div>
                        <p className={getDifficultyClass(question.difficulty)}>
                          {question.difficulty}
                        </p>
                      <div className='content-div' dangerouslySetInnerHTML={createMarkup(question.content)} />
                  </div>
                    )}
              </div>
            </Box>
          </Grid>
          <Grid item xs={7} container justify="flex-end">
            <Box style={editorStyles}>
              { roomJoined && (
                <div style={{display:"flex"}}>
                  <EditorComp
                    roomJoined={getRoomJoined}
                    setOutput={setOutput}
                    socket = {socket}
                  />
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <MessagingBox 
              socket={socket}
              roomJoined={roomJoined}
            />
          </Grid>
          <Grid item xs={8}>
            <Box boxShadow={3} style={{ height: '26vh' }}>
            <div>
              <h3>Compiled Result</h3>
              <div>{output}</div>
            </div>
            </Box>
            <button onClick={handleSubmission} style={{ width: '100%', height :'4vh', backgroundColor:'red', color: 'white' }}>SUBMIT</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CollaborationPage;
