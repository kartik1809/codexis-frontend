import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/DashBoard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute';
import Projects from './pages/Projects';
import WebProject from './pages/WebPen/WebProject';
import ProfilePage from './pages/Profile/ProfilePage';
import PreLoader from './components/Preloader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route element={<PrivateRoute />}>
          
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/webproject" element={<WebProject />} />
          <Route path="/loading" element={<PreLoader/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
