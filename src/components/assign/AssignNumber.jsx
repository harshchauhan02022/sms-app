import React, { useState } from 'react';
import axios from 'axios';

const AssignNumber = ({ user, availableNumbers, handleSave }) => {
 const [selectedNumber, setSelectedNumber] = useState('');

 const handleInputChange = (e) => {
  setSelectedNumber(e.target.value);
 };

 const handleAssignNumber = async () => {
  try {
   const token = localStorage.getItem('token');
   await axios.put(`http://192.168.29.20:9090/user/${user.id}/assignNumber`, 
    { phoneNumber: selectedNumber },
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   handleSave({ ...user, phoneNumber: selectedNumber });
  } catch (error) {
   console.error('Error assigning number:', error);
  }
 };

 return (
  <form className="form">
   <div className="row">
    <div className="col-12 mt-3">
     <label>Select Phone Number</label>
     <select
      name="phoneNumber"
      value={selectedNumber}
      onChange={handleInputChange}
      className="form-control"
     >
      <option value="">Select a number</option>
      {availableNumbers.map((number) => (
       <option key={number.id} value={number.phoneNumber}>
        {number.phoneNumber}
       </option>
      ))}
     </select>
    </div>
    <div className="col-12 mt-4">
     <div className="d-flex justify-content-between">
      <button
       type="button"
       className="btn btn-primary"
       onClick={handleAssignNumber}
       disabled={!selectedNumber}
      >
       Assign Number
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

export default AssignNumber;
