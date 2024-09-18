import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { addClass, getDepartments } from '../services/ClassService';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (className.trim() === '' || department.trim() === '') {
      alert('Class Name and Department are required');
      return;
    }

    const classData = { name: className, departmentId: department };

    try {
      await addClass(classData);
      alert('Class added successfully');
      navigate('/'); 
    } catch (error) {
      console.error('Error adding class:', error);
      alert('An error occurred while adding the class. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f9e0',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Add Class
      </Typography>

      <TextField
        label="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        fullWidth
        required
        inputProps={{ maxLength: 50 }}
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth required sx={{ mb: 3 }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          label="Department"
        >
          {loading ? (
            <MenuItem disabled>Loading departments...</MenuItem>
          ) : (
            departments.length > 0 ? (
              departments.map((dept) => (
                <MenuItem key={dept._id} value={dept._id}>
                  {dept.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Departments Available</MenuItem>
            )
          )}
        </Select>
      </FormControl>

      <Box textAlign="center">
        <Button type="submit" variant="contained" color="primary" sx={{ px: 5 }}>
          Add Class
        </Button>
      </Box>
    </Box>
  );
};

export default AddClass;
