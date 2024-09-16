import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./common/sidebar/Sidebar";
import Header from "./common/header/Header";
import "./DashboardPanel.scss";
// import ContactList from "./common/ContactList/contactList";
import ContactList from "../contact/ContactList"
import UserList from "../user/UserList";

function DashboardPanel() {
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
                    <div className="col-md-9">
                        <UserList />
                    </div>
                    <div className="col-md-3">
                        <ContactList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPanel;
