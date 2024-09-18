// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClassList from './components/ClassList';
import ClassForm from './components/ClassForm';
import EditClass from './components/EditClass';
import Navbar from './components/Navbar';
import AddDepartmentPage from './components/AddDepartmentPage';
import DepartmentList from './components/DepartmentList'; // Import the new DepartmentList component

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px', marginTop:"5%" }}>
        <Routes>
          <Route path="/" element={<ClassList />} />
          <Route path="/add-class" element={<ClassForm isEdit={false} />} />
          <Route path="/edit-class/:id" element={<EditClass isEdit={true} />} />
          <Route path="/add-department" element={<AddDepartmentPage />} />
          <Route path="/department-list" element={<DepartmentList />} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
