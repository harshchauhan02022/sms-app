import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/common/sidebar/Sidebar";
import Header from "../dashboard/common/header/Header";
import MainChat from "../chat/MainChat";

const AdminSms = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    navigate("/login");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <Header toggle={toggleSidebar} userEmail={userEmail} logout={logout} />
      <div className="dashboardContent p-2 mt-4">
        <div className="row">
          <div className="col-md-12">
            <MainChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSms;
