import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import "./home/home.scss";
export default function Integrations() {
  const handleConnectFacebook = async () => {
    // Redirect to backend route to initiate OAuth flow
    window.location.href = "http://localhost:5000/auth/facebook";
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <button onClick={handleConnectFacebook}>Connect Facebook Page</button>
      </div>
    </div>
  );
}
