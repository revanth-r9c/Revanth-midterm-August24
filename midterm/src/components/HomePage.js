import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';
import ShowProducts from './ShowProducts'; 

const HomePage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Container
      sx={{
        // display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      {user ? (
        <ShowProducts />
      ) : (
        <Typography variant="h5">
          Welcome to the E-commerce HomePage
        </Typography>
      )}
    </Container>
  );
};

export default HomePage;
