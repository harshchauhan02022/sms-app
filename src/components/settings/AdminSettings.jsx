import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/common/sidebar/Sidebar";
import Header from "../dashboard/common/header/Header";
import EditSettingPop from "../edit/EditSettingPop";
import PasswordPop from "../Popup/PasswordPop";

const AdminSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const email = localStorage.getItem("userEmail");
  const [userEmail, setUserEmail] = useState(email);
  const [password, setPassword] = useState("*******");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const Id = localStorage.getItem("id");

  useEffect(() => {
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
            {console.log(role)}
            {role === "ROLE_ADMIN" ? (
              <div>
                <h1>Admin Setting</h1>
                <div className="table-responsive mt-3 ">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Action</th>
                        <th>Password</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{email}</td>
                        <td>
                          {" "}
                          <button className="btn btn-primary btn-sm ms-1">
                            <EditSettingPop />
                          </button>
                        </td>
                        <td>{password}</td>
                        <td>
                          {" "}
                          <button className="btn btn-primary btn-sm ms-1">
                            <PasswordPop />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="table-responsive mt-3 ">
                <h1>User Setting</h1>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{email}</td>
                      <td>{password}</td>
                      <td>
                        {" "}
                        <button className="btn btn-primary btn-sm ms-1">
                          <PasswordPop id={Id} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
