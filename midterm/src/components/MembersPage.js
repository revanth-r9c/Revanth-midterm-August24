import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const MembersPage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Member Information
      </Typography>
      {user ? (
        <Card
          sx={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#f9f9f9',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <strong>Username:</strong> {user.user.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Email:</strong> {user.user.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Display Name:</strong> {user.user.displayName}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="textSecondary">
          No user data available
        </Typography>
      )}
    </Container>
  );
};

export default MembersPage;
