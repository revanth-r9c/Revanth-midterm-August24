import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
  return (
    <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Button component={Link} to="/" sx={{ color: 'black', fontWeight: 'bold' }}>
          Home
        </Button>
        <Button component={Link} to="/login" sx={{ color: 'black', fontWeight: 'bold' }}>
          Login
        </Button>
        <Button component={Link} to="/register" sx={{ color: 'black', fontWeight: 'bold' }}>
          Register
        </Button>
        {user && (
            <Button component={Link} to="/admin" sx={{ color: 'black', fontWeight: 'bold' }}>
              Admin
            </Button>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
