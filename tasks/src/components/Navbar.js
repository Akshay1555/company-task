import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed" mb="50px" sx={{ backgroundColor: '#1976d2', }}> {/* Position fixed for a fixed navbar */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Class Management
        </Typography>
        <Button color="inherit" component={Link} to="/">
          C-List
        </Button>
        <Button color="inherit" component={Link} to="/add-class">
          Add Class
        </Button>
        <Button color="inherit" component={Link} to="/add-department">
          Add Dept
        </Button>
        <Button color="inherit" component={Link} to="/department-list">
          D-List
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
