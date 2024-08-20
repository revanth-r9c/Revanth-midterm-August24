// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Button, CircularProgress, Container, Typography, Box } from '@mui/material';
// import { register } from '../actions/userActions';

// const RegisterPage = () => {
//   const dispatch = useDispatch();
//   const { loading, user, error } = useSelector(state => state.user);
//   const [displayName, setDisplayName] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(register(displayName, email, username, password));
//   };
//   const [confirmPassword, setConfirmPassword] = useState('');

//   return (
//     <Container
//       component="main"
//       maxWidth="xs"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '90vh',
//         padding: 3,
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Register
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: '100%',
//           maxWidth: '400px',
//           padding: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           backgroundColor: '#ffffff',
//           borderRadius: 2,
//           boxShadow: 3,
//         }}
//       >
//         <TextField
//           label="Display Name"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={displayName}
//           onChange={e => setDisplayName(e.target.value)}
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />
//         <TextField
//             label="Confirm Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ marginTop: 2 }}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : 'Register'}
//         </Button>
//         {error && (
//           <Typography color="error" sx={{ marginTop: 2 }}>
//             {error}
//           </Typography>
//         )}
//         {user && (
//           <Typography variant="h6" sx={{ marginTop: 2 }}>
//             Registration successful! Welcome, {user.user.username}!
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default RegisterPage;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress, Container, Typography, Box } from '@mui/material';
import { register } from '../actions/userActions';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(state => state.user);

  const initialValues = {
    displayName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    displayName: Yup.string().required('Display Name is required').min(4,"min 4 chars").max(15,"not more than 15"),
    email: Yup.string().matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Email must be a valid email address').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values.displayName, values.email, values.username, values.password));
    setSubmitting(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
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
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              sx={{
                width: '100%',
                maxWidth: '400px',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Field
                as={TextField}
                name="displayName"
                label="Display Name"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="displayName" />}
                error={<ErrorMessage name="displayName" />}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="email" />}
                error={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="username" />}
                error={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="password" />}
                error={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={<ErrorMessage name="confirmPassword" />}
                error={<ErrorMessage name="confirmPassword" />}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={loading || isSubmitting}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
              {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                  {error}
                </Typography>
              )}
              {user && (
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Registration successful! Welcome, {user.user.username}!
                </Typography>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterPage;
