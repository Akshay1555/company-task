// src/services/ClassService.js

import axios from 'axios';

const API_URL = 'http://localhost:8888/api'; 

// Fetch all classes
export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_URL}/classes`);
    return response.data; // Return data directly if it's already an array
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

// Fetch a single class by id
export const getClassById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching class by id:', error);
    throw error;
  }
};

// Add a new class
export const addClass = async (classData) => {
  try {
    const response = await axios.post(`${API_URL}/classes`, classData);
    return response.data;
  } catch (error) {
    console.error('Error adding class:', error);
    throw error;
  }
};

// Edit an existing class
export const editClass = async (id, classData) => {
  try {
    const response = await axios.put(`${API_URL}/classes/${id}`, classData);
    return response.data;
  } catch (error) {
    console.error('Error editing class:', error);
    throw error;
  }
};

// Delete a class
export const deleteClass = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

// Add a new department
export const addDepartment = async (department) => {
  try {
    const response = await axios.post(`${API_URL}/departments`, department);
    return response.data;
  } catch (error) {
    console.error('Error adding department:', error);
    throw error;
  }
};

// Fetch all departments
export const getDepartments = async () => {
  try {
    const response = await axios.get(`${API_URL}/departments`);
    return response.data; // Return data directly if it's already an array
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

// Delete a department
export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
};
