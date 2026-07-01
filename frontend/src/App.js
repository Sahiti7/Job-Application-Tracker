import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobForm from './pages/JobForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="app">
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <JobForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <JobForm edit />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;