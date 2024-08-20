import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, MenuItem, CircularProgress, Container, Typography } from "@mui/material";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(3, "Should be between 3 and 30")
    .max(30, "can't exceed more than 30 characters"),
  code: Yup.string().required("Product code is required"),
  excerpt: Yup.string()
    .required("Product description is required")
    .min(30, "Should be between 30 and 500")
    .max(500, "can't exceed more than 500 characters"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(0, "Price cannot be negative"),
  stock: Yup.number()
    .required("Stock is required")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

function Addproducts() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        alert("Server is not responding. Please try again later.");
        console.error(error);
      });
  }, []);

  const generateCode = () => {
    const uuid = uuidv4();
    const code = uuid.slice(0, 6);
    return code;
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
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Products
      </Typography>
      <Formik
        initialValues={{ name: "", code: "", excerpt: "", category: "", price: 0, stock: 0 }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios
            .post("http://localhost:3000/api/v1/products", values)
            .then(() => {
              navigate('/ShowProducts');
              resetForm();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form style={{ width: '100%' }}>
            <Field
              as={TextField}
              name="name"
              label="Product Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...(props) => (
                <>
                  <TextField {...props} />
                  <ErrorMessage name="name">
                    {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                  </ErrorMessage>
                </>
              )}
            />
            <div style={{ display: 'flex', width: '100%', marginTop: 8 }}>
              <Field
                as={TextField}
                name="code"
                label="Product Code"
                variant="outlined"
                fullWidth
                margin="normal"
                {...(props) => (
                  <>
                    <TextField {...props} />
                    <ErrorMessage name="code">
                      {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                    </ErrorMessage>
                  </>
                )}
              />
              <Button
                type="button"
                variant="outlined"
                onClick={() => setFieldValue("code", generateCode())}
                sx={{ marginLeft: 1 }}
              >
                Generate Code
              </Button>
            </div>
            <Field
              as={TextField}
              name="excerpt"
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              {...(props) => (
                <>
                  <TextField {...props} />
                  <ErrorMessage name="excerpt">
                    {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                  </ErrorMessage>
                </>
              )}
            />
            <Field
              as={TextField}
              select
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              {...(props) => (
                <>
                  <TextField {...props} />
                  <ErrorMessage name="category">
                    {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                  </ErrorMessage>
                </>
              )}
            >
              <MenuItem value="" disabled>Select a category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Field>
            <Field
              as={TextField}
              name="price"
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              {...(props) => (
                <>
                  <TextField {...props} />
                  <ErrorMessage name="price">
                    {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                  </ErrorMessage>
                </>
              )}
            />
            <Field
              as={TextField}
              name="stock"
              label="Stock"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              {...(props) => (
                <>
                  <TextField {...props} />
                  <ErrorMessage name="stock">
                    {msg => <Typography color="error" variant="body2">{msg}</Typography>}
                  </ErrorMessage>
                </>
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Addproducts;

