import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">
          PeerPrep
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/CollaborationPage" color="inherit">Collaboration</Button>
        <Button component={Link} to="/UserProfile" color="inherit">Profile</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
