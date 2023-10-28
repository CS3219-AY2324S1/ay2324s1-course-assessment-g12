import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function MessagingBox({socket, roomJoined}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const messageContainerStyle = {
    border: '1px solid #d4d4d4',
    borderRadius: '4px',
    width: '100%',
    height: '100%',
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
    overflowY: 'auto',

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
      socket.emit("send-message", newMessage, socket.id, roomJoined)
      setNewMessage('');
    }
  };

  socket.on("get-message", msg => {
    setMessages(prevMessages => [...prevMessages, msg]);
  })

  return (
    <div style={containerStyle}>
      <Box boxShadow={3} style={messageContainerStyle}>
        <div style={messageAreaStyle}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
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
