import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavbarAdmin = () => {
  return (
    <AppBar position="sticky" style={{ backgroundColor: '#A3A6FF' }}>
      <Toolbar>
        <Typography variant="h6">
          PeerPrep
        </Typography>
        <Button component={Link} to="/Home" color="inherit">HOME</Button>
        <Button component={Link} to="/AdminQuestions" color="inherit">QUESTIONS</Button>
        <Button component={Link} to="/UserProfile" color="inherit">PROFILE</Button>
        <Button component={Link} to="/AddQuestion" color="inherit">ADD QUESTION</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
