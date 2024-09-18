import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MUIDataTable from 'mui-datatables';
import { deleteClass, getClasses } from '../services/ClassService';
import { CircularProgress, Box, Typography } from '@mui/material';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await getClasses();
        setClasses(response);
      } catch (err) {
        console.error('Failed to load classes', err);
        setError('Failed to load classes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClass(id);
        setClasses(classes.filter((cls) => cls._id !== id));
      } catch (err) {
        console.error('Failed to delete class', err);
        setError('Failed to delete class. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-class/${id}`);
  };

  const columns = [
    {
      name: 'name',
      label: 'Class Name',
      
    },
    {
      name: 'departmentName',
      label: 'Department',
      
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        customBodyRenderLite: (index) => {
          const cls = classes[index];
          return (
            <div>
              <IconButton color="primary" onClick={() => handleEdit(cls._id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(cls._id)}>
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
      title="Class List"
      columns={columns}
      data={classes.map((cls) => ({
        ...cls,
        departmentName: cls.departmentId ? cls.departmentId.name : 'No Department',
      }))}
    />
  );
};

export default ClassList;
