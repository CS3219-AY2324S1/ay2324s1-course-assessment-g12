import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function MessagingBox({socket, roomJoined, userData}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketIO, setSocket] = useState(null);
  // The socket
  useEffect(() => {
    const sock = socket;

    socket.on("get-message", msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
    setSocket(sock); // Store the socket object in state
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const messageContainerStyle = {
    border: '1px solid #d4d4d4',
    borderRadius: '4px',
    width: '100%',
    height: '30vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const messageAreaStyle = {
    height: '25vh',
    overflowY: 'auto',
    maxHeight: '25vh',
    padding: '10px',
  };

  const messageInputStyle = {
    padding: '1px',

  };

  const buttonStyle = {
    background: 'green',
    color: 'white',
    borderRadius: 0,
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socketIO.emit("send-message", newMessage, userData, roomJoined)
      setNewMessage('');
    }
  };

  return (
    <div style={containerStyle}>
      <Box boxShadow={3} style={messageContainerStyle}>
        <div style={messageAreaStyle}>
          {messages.map((message, index) => {
            if (index % 2 !== 0) { // Check if index is odd
              return <div key={index}>{message}</div>;
            } else {
              return null; // Return null for even indexes (won't render)
            }
          })}
        </div>
        <TextField
          style={messageInputStyle}
          variant="outlined"
          fullWidth
          multiline
          rows={1}
          value={newMessage}
          onChange={handleInputChange}
        />
        <Button
          style={buttonStyle}
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </div>
  );
}

export default MessagingBox;
