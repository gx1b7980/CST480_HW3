import React from 'react';
import './Home.css'; // Import the CSS file for additional styling
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

function Home() {
    const theme = useTheme(); // Use the theme for consistent styling

    return (
        <div>
            {/* AppBar at the top of the page */}
            
            {/* Main content area */}
            <Container maxWidth="sm" style={{ marginTop: theme.spacing(4) }}>
                <Paper elevation={3} style={{ padding: theme.spacing(3) }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome to my Home Page
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        This is the starting point of our Book List Table.
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: theme.spacing(2) }}>
                        Learn More
                    </Button>
                    {/* More content can go here */}
                </Paper>
            </Container>

            {/* Footer */}
            <Box mt={5} py={3} bgcolor={theme.palette.background.paper} textAlign="center">
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Sahil Khanna for CS-T480
                    </Typography>
                </Container>
            </Box>
        </div>
    );
}

export default Home;
