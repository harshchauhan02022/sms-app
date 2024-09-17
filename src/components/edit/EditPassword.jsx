import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditPassword = ({ user, Id, handleSave }) => {
  const [formData, setFormData] = useState({
    currentEmail: "",
    newPassword: "",
    currentPassword: "",
  });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSetting = async () => {
    try {
      if (role === "ROLE_ADMIN") {
        // Admin will update email and password
        await axios.put(
          `http://192.168.29.20:9090/admin/update-password`,
          {
            currentEmail: formData.currentEmail,
            newPassword: formData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Admin password updated successfully!");
      } else {
        // User will update old password and new password
        await axios.put(
          `http://192.168.29.20:9090/user/change-password`,
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("User password updated successfully!");
      }
      handleSave(formData); // Reflect changes in the parent component
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.");
    }
  };

  return (
    <form className="form">
      <div className="row">
        {role === "ROLE_ADMIN" ? (
          <>
            <div className="col-md-6">
              <label>Current Email</label>
              <input
                type="email"
                name="currentEmail"
                value={formData.currentEmail}
                onChange={handleInputChange}
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="col-md-6">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="form-control"
                placeholder=""
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6">
              <label>Old Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="col-md-6">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="form-control"
                placeholder=""
              />
            </div>
          </>
        )}
        <div className="col-12 mt-4">
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateSetting}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-dark ml-2"
              onClick={() => handleSave(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditPassword;
