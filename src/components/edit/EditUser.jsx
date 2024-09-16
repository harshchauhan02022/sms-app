import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ user, handleSave }) => {
 const [formData, setFormData] = useState({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  telephone: user.telephone,
  status: user.status,
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
   await axios.put(`http://192.168.29.20:9090/user/${user.id}`, formData, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   alert('User updated successfully!');
   handleSave(formData); // Call handleSave with updated user data to update in the parent
  } catch (error) {
   console.error('Error updating user:', error);
  }
 };

 return (
  <form className="form">
   <div className="row">
    {/* {successMessage && (
     <div className="text-center mt-3">
      <p className="text-success">{successMessage}</p>
     </div>
    )}
    {errorMessage && (
     <div className="text-center mt-3">
      <p className="text-danger">{errorMessage}</p>
     </div>
    )} */}
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
    <div className="col-12 mt-4">
     <div className="d-flex justify-content-between">
      <button
       type="button"
       className="btn btn-primary"
       onClick={handleUpdateUser}
      >
       Update User
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

export default EditUser;
