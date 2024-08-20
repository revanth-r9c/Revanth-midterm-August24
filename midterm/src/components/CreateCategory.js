import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, "Should be between 3 and 30")
    .max(30, "can't exceed more than 30 characters"),
  description: Yup.string()
    .required('Description is required')
    .min(50, "Should be between 50 and 500")
    .max(500, "can't exceed more than 500 characters"),
});

const CreateCategory = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      axios.post('http://localhost:3000/api/v1/categories', values)
        .then(response => {
          alert('Category Created Successfully!! :)');
          navigate('/'); 
          resetForm();
        })
        .catch(error => {
          console.error('Error creating category:', error);
          alert('Failed to create category. Please try again.');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create Category
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('name')}
          helperText={formik.touched.name && formik.errors.name}
          error={Boolean(formik.touched.name && formik.errors.name)}
          sx={{ marginBottom: 1 }}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          {...formik.getFieldProps('description')}
          helperText={formik.touched.description && formik.errors.description}
          error={Boolean(formik.touched.description && formik.errors.description)}
          sx={{ marginBottom: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} /> : 'Create'}
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate('/Category')}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default CreateCategory;

