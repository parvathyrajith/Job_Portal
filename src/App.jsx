import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import BrowseJobsPage from "./components/BrowseJobsPage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import './App.css';
import ViewAppliedJobsPage from "./components/ViewAppliedJobsPage";
import ManageJobsPage from "./components/ManageJobsPage";
import ViewApplicationsPage from "./components/ViewApplicationsPage";
import ApplyPage from "./components/ApplyPage";
import ProfilePage from "./components/ProfilePage";
import NavBar2 from "./components/NavBar2";
import NavBar3 from "./components/NavBar3";
import Logout from "./components/Logout";

const App = () => {
  return (
    <>
      {/* Main Navbar */}
      <NavBar />

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/browse-jobs" element={<><NavBar2 /><BrowseJobsPage /></>} />
        <Route path="/applied-jobs" element={<><NavBar2 /><ViewAppliedJobsPage /></>} />
        <Route path="/profile" element={<><NavBar2 /><ProfilePage /></>} />
        

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-jobs" element={<><NavBar3 /><ManageJobsPage /></>} />
        <Route path="/view-applications" element={<><NavBar3 /><ViewApplicationsPage /></>} />
        <Route path="/apply/:jobId" element={<><NavBar2 /><ApplyPage /></>} />

        <Route path="/view-applied-jobs" element={<><NavBar2 /><ViewAppliedJobsPage /></>} />


        {/* Fallback Route */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />

        {/* Search Results and Apply Routes*/}
        <Route path="/" element={<BrowseJobsPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />

        {/* Logout*/}
        <Route path="/logout" element={<><Logout /></>} />
      </Routes>
    </>
  );
};

export default App;