import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, IconButton, Typography, Container, CssBaseline } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const apiURL = 'http://localhost:5001';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Theme configuration
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#1c1c1c' : '#f5f5f5',
        paper: darkMode ? '#2a2a2a' : '#fff',
      },
      text: {
        primary: darkMode ? '#e0e0e0' : '#000',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
  });

  // Fetch products from the API
  const fetchProducts = () => {
    axios
      .get(`${apiURL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  };

  // Delete a product by ID
  const handleDelete = (id) => {
    axios
      .delete(`${apiURL}/api/products/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          transition: 'background-color 0.3s ease', // Smooth background color transition
        }}
      >
        {/* Theme Toggle Button */}
        <IconButton
          sx={{ alignSelf: 'flex-end', marginBottom: '20px' }}
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>

        <Container
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '16px',
            justifyItems: 'center',
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: '360px',
                position: 'relative',
                backgroundColor: theme.palette.background.paper,
                transition: 'background-color 0.3s ease', // Smooth card background color transition
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(product.id)}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
              >
                <DeleteIcon />
              </IconButton>

              <CardMedia
                sx={{ height: 200 }}
                image={product.imageUrl}
                title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="h6" component="div">
                  {'$' + product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default ProductList;
