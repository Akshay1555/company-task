// src/components/DepartmentList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from 'mui-datatables';
import { deleteDepartment, getDepartments } from '../services/ClassService';
import { CircularProgress, Box, Typography } from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response);
      } catch (err) {
        console.error('Failed to load departments', err);
        setError('Failed to load departments');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
         deleteDepartment(id);
        setDepartments(departments.filter((dept) => dept._id !== id));
      } catch (err) {
        console.error('Failed to delete department', err);
        setError('Failed to delete department');
      }
    }
  };

  
  const columns = [
    {
      name: 'name',
      label: 'Department Name',
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        customBodyRenderLite: (index) => {
          const dept = departments[index];
          return (
            <div>
              
              <IconButton color="error" onClick={() => handleDelete(dept._id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        },
      },
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <MUIDataTable
      title="Department List"
      columns={columns}
      data={departments}
    />
  );
};

export default DepartmentList;
