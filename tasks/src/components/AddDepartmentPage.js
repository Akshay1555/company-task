import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addDepartment } from '../services/ClassService';
import { useNavigate } from 'react-router-dom';

const AddDepartmentPage = () => {
  const [newDepartment, setNewDepartment] = useState('');
  const navigate = useNavigate();

  const handleAddDepartment = async () => {
    if (newDepartment.trim() === '') {
      alert('Please enter a department name');
      return;
    }

    try {
      await addDepartment({ name: newDepartment });
      alert('Department added successfully!');
      navigate('/'); // Redirect to class list or another page
    } catch (error) {
      console.error('Error adding department:', error);
      alert('An error occurred while adding the department. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: 3,
        mt: 5,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Add Department
      </Typography>
      <TextField
        label="Department Name"
        value={newDepartment}
        onChange={(e) => setNewDepartment(e.target.value)}
        fullWidth
        required
        sx={{ mb: 3 }}
      />
      <Box textAlign="center">
        <Button variant="contained" color="primary" onClick={handleAddDepartment}>
          Add Department
        </Button>
      </Box>
    </Box>
  );
};

export default AddDepartmentPage;
