import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ user, handleSave }) => {
 const [formData, setFormData] = useState({
  firstName: user?.firstName || '',
  lastName: user?.lastName || '',
  email: user?.email || '',
  telephone: user?.telephone || '',
  status: user?.status || '',
  id: user?.id || '',
 });

 const token = localStorage.getItem('token');

 const handleInputChange = (e) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleUpdateUser = async () => {
  try {
   // Sending PUT request to update the user
   const response = await axios.put(
    `http://192.168.29.20:9090/user/edit`,
    formData,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   // Check if the request was successful and return the updated user
   if (response.status === 200) {
    alert('User updated successfully!');
    handleSave(response.data); // This will trigger the parent update
   } else {
    alert('Failed to update user. Please try again.');
   }
  } catch (error) {
   // Log full error response to get more details
   if (error.response) {
    // The request was made, and the server responded with a status code outside of the 2xx range
    console.error('Error response data:', error.response.data);
    console.error('Error response status:', error.response.status);
    console.error('Error response headers:', error.response.headers);
    alert(`Error: ${error.response.data?.message || 'Failed to update user. Please check the details.'}`);
   } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request data:', error.request);
    alert('No response from server. Please try again later.');
   } else {
    // Something happened in setting up the request
    console.error('Error setting up request:', error.message);
    alert('Error setting up the request. Please check your code.');
   }
  }
 };

 return (
  <form className="form">
   <div className="row">
    <div className="col-md-6">
     <label>First Name</label>
     <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleInputChange}
      className="form-control"
     />
    </div>
    <div className="col-md-6">
     <label>Last Name</label>
     <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleInputChange}
      className="form-control"
     />
    </div>
    <div className="col-12 mt-3">
     <label>Email</label>
     <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      className="form-control"
     />
    </div>
    <div className="col-12 mt-3">
     <label>Telephone</label>
     <input
      type="text"
      name="telephone"
      value={formData.telephone}
      onChange={handleInputChange}
      className="form-control"
     />
    </div>
    <div className="col-12 mt-3">
     <label>Status</label>
     <input
      type="text"
      name="status"
      value={formData.status}
      onChange={handleInputChange}
      className="form-control"
     />
    </div>
   </div>
   <button
    type="button"
    className="btn btn-primary mt-4"
    onClick={handleUpdateUser}
   >
    Save Changes
   </button>
  </form>
 );
};

export default EditUser;
