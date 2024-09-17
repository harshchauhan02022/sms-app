import React, { useState } from 'react';
import axios from 'axios';

const EditSetting = ({ user, id, handleSave }) => {
  const [Email, setEmail] = useState(''); // Current Email
  const [newEmail, setNewEmail] = useState(''); // New Email
  const [Data, setData] = useState({});

  const token = localStorage.getItem('token');

  // Handler for current email change
  const handleCurrentEmailChange = (e) => {
    const updatedCurrentEmail = e.target.value;
    setEmail(updatedCurrentEmail);
    setData({
      ...Data, // Spread the previous state to ensure other fields (if any) are preserved
      currentEmail: updatedCurrentEmail,
    });
  };

  // Handler for new email change
  const handleNewEmailChange = (e) => {
    const updatedNewEmail = e.target.value;
    setNewEmail(updatedNewEmail);
    setData({
      ...Data,
      newEmail: updatedNewEmail,
    });
  };

  const handleUpdateSetting = async () => {
    try {
      await axios.put(
        `http://192.168.29.20:9090/admin/update-email`, // Fixed the typo in the URL
        Data, // Send the updated Data object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Email updated successfully!');
      handleSave(newEmail); // Call handleSave with the updated email
    } catch (error) {
      console.error('Error updating email:', error);
      alert('Failed to update email.');
    }
  };

  return (
    <form className="form">
      <div className="row">
        <div className="col-md-6">
          <label>Current Email</label>
          <input
            type="email"
            name="email"
            value={Email}
            onChange={handleCurrentEmailChange}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>New Email</label>
          <input
            type="email"
            name="newemail"
            value={newEmail}
            onChange={handleNewEmailChange}
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
