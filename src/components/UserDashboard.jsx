import React from "react";
import NavBar2 from "./NavBar2"; // Import the second navbar

const UserDashboard = () => {
  return (
    <div>
      <NavBar2 />
      <div style={{ padding: "20px" }}>
        <h1>Welcome to your User Dashboard</h1>
        <p>Here you can browse jobs, view applied jobs, and manage your profile.</p>
      </div>
    </div>
  );
};

export default UserDashboard; 