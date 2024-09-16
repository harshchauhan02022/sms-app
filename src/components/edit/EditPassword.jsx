import React, { useState } from "react";
import axios from "axios";

const EditPassword = ({ user, Id, handleSave }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    id: Id,
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
    if (role == "ROLE_ADMIN") {
      try {
        await axios.put(
          `http://192.168.29.20:9090/admin/66d006cee7330378a4427f04/change-password`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Password updated successfully!");
        handleSave(formData);
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password.");
      }
    }
    try {
      await axios.put(`http://192.168.29.20:9090/user/change-password`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Password updated successfully!");
      handleSave(formData); // Call handleSave with updated data to reflect changes in the parent component
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  return (
    <form className="form">
      <div className="row">
        <div className="col-md-6">
          <label>Old Password</label>
          <input
            type="password" // Set the input type to password for security
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter your old password"
          />
        </div>
        <div className="col-md-6">
          <label>New Password</label>
          <input
            type="password" // Set the input type to password for security
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter your new password"
          />
        </div>
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
