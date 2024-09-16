import React, { useState } from 'react';
import axios from 'axios';

const EditSetting = ({ user, id, handleSave }) => {
  const [Email, setEmail] = useState('');
  const [Data, setData] = useState({});

  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setData({ newEmail });  // Update the Data object directly
  };

  const handleUpdateSetting = async () => {
    try {
      // Ensure Data contains the latest email before making the request
      await axios.put(
        `http://192.168.29.20:9090/admin/66d006cee7330378a4427f04/change-email`,
        Data, // Send Data as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure correct content type
          },
        }
      );
      alert('Email updated successfully!');
      handleSave(Email); // Call handleSave with updated email
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Failed to update email.');
    }
  };

  return (
    <form className="form">
      <div className="row">
        <div className="col-md-12">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={Email}
            onChange={handleInputChange}
            className="form-control"
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

export default EditSetting;
