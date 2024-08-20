import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Typography, Grid, Box, CircularProgress } from '@mui/material';
import DataTable from 'react-data-table-component';
import { styled } from '@mui/material/styles';
import moment from 'moment-timezone';

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[5],
}));

const timezone = "Asia/Kolkata";

const ExpandedComponent = ({ data }) => (
    <Box padding={2} bgcolor="#f5f5f5">
        <Typography variant="body2"><strong>Description:</strong> {data.excerpt || 'N/A'}</Typography>
        <Typography variant="body2"><strong>Stock:</strong> {data.stock || 'N/A'}</Typography>
        <Typography variant="body2"><strong>Created At:</strong> {moment(data.created_at).tz(timezone).format('DD-MMM-YYYY HH:mm:ss')}</Typography>
    </Box>
);

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/products")
            .then((res) => {
                if (res.data.ok && Array.isArray(res.data.products)) {
                    setProducts(res.data.products);
                } else {
                    console.error("Unexpected API response format:", res.data);
                    setProducts([]);
                }
            })
            .catch((err) => {
                console.error("API call failed:", err);
                setProducts([]);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.excerpt && product.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => `$${row.price}`,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => `${row.excerpt}`,
            width: '50%',
        }
    ];

    const data = filteredProducts.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        excerpt: product.excerpt,
        stock: product.stock,
        created_at: product.created_at,
    }));

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>
                Products Management
            </Typography>

            <TextField
                label="Search"
                variant="outlined"
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name"
            />

            <FormContainer>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover
                        selectableRows
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        paginationPerPage={5}
                    />
                )}
            </FormContainer>
        </Box>
    );
};

export default ShowProducts;
