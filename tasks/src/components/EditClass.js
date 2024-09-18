import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClassById, editClass, getDepartments } from '../services/ClassService';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography, Alert } from '@mui/material';

const EditClass = () => {
  const { id } = useParams(); // Get the class ID from the URL
  const navigate = useNavigate();
  const [classData, setClassData] = useState({ name: '', departmentId: '' });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // State to show success message

  useEffect(() => {
    const fetchClassAndDepartments = async () => {
      try {
        const [classDetails, departmentList] = await Promise.all([
          getClassById(id),
          getDepartments()
        ]);
        setClassData(classDetails);
        setDepartments(departmentList);
      } catch (err) {
        console.error('Failed to fetch data', err);
        setError('Failed to load class and departments.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassAndDepartments();
  }, [id]);

  const handleSave = async () => {
    try {
      await editClass(id, classData); // Update the class
      setSuccess(true); // Show success message
      // Trigger navigation after a delay of 3 seconds
      setTimeout(() => {
        navigate('/'); // Redirect after showing the success message
      }, 3000);
    } catch (err) {
      console.error('Failed to update class', err);
      setError('Failed to update class. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2,borderRadius: '15px',
        boxShadow: 3 , backgroundColor:'#f5f9e0' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Class
      </Typography>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Class Name"
          variant="outlined"
          value={classData.name}
          onChange={(e) => setClassData({ ...classData, name: e.target.value })}
          fullWidth
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          id="department-select"
          value={classData.departmentId}
          label="Department"
          onChange={(e) => setClassData({ ...classData, departmentId: e.target.value })}
        >
          <MenuItem value="" disabled>
            Select Department
          </MenuItem>
          {departments.map((dept) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Update
        </Button>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={success}
        autoHideDuration={3000} // Show for 3 seconds
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Class updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditClass;
