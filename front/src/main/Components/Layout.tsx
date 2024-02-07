import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import "./Layout.css";

function Header() {
    return (
        <Toolbar>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/repository">Full Default Database</Button>
            <Button color="inherit" component={Link} to="/BTable">Book Table</Button>
            <Button color="inherit" component={Link} to="/AddBook">Add Book</Button>
            <Button color="inherit" component={Link} to="/EditBook">Edit Book</Button>
        </Toolbar>
    );
}

function Layout() {
    return (
        <>
            <AppBar position="static">
                <Header />
            </AppBar>
            <Container>
                <Box my={4}>
                    <Outlet />
                </Box>
            </Container>
        </>
    );
}

export default Layout;
