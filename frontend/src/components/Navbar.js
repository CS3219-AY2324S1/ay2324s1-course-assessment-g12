import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const Navbar = () => {
  return (
    <AppBar position="sticky" style={{ backgroundColor: '#A3A6FF' }}>
      <Toolbar>
        <Typography variant="h6">
          PeerPrep
        </Typography>
        <Button component={Link} to="/Page/Home" color="inherit">HOME</Button>
        <Button component={Link} to="/Page/Questions" color="inherit">QUESTIONS</Button>
        <Button component={Link} to="/Page/UserProfile" color="inherit">PROFILE</Button>
        <Button component={Link} to="/Page/AddQuestion" color="inherit">ADD QUESTION</Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
