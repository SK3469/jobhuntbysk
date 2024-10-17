import React from 'react';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import { Route, Routes,BrowserRouter, RouterProvider } from 'react-router-dom';
import login from './components/auth/login';
import signup from './components/auth/signup';
import Home from './components/Home';
import Jobs from './components/jobs';
import Browse from './components/Browse';
import Profile from './components/profile';
import './App.css';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
  <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<login />} />
        <Route path="/signup" element={<signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/description/:id" element={<JobDescription/>} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        {/* for admin */}
        <Route path="/admin/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>} />
        <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>} />
        <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup/></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>} />
        <Route path="/admin/job/create" element={<ProtectedRoute><PostJobs/></ProtectedRoute>} />
        <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants/></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );

}

export default App;
