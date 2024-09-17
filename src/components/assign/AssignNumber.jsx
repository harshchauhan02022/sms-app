import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
const AssignNumber = ({ user, availableNumbers, handleSave }) => {
 const [selectedNumber, setSelectedNumber] = useState('');

 const handleInputChange = (e) => {
  setSelectedNumber(e.target.value);
 };

 const handleAssignNumber = async () => {
  if (!selectedNumber) {
    toast.success('Please select a phone number before assigning.');
   return;
  }

  try {
   const token = localStorage.getItem('token');

   // Payload structure for the API
   const payload = {
    phoneNumber: selectedNumber, // The selected phone number
    customerId: user?.id ? user?.id : null,         // User ID for customer assignment
   };

   // Send the PUT request to assign the phone number
   await axios.post(
    'http://192.168.29.20:9090/phone/assign-customer',
    payload,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   // Trigger the handleSave function with updated user data
   handleSave({ ...user, phoneNumber: selectedNumber });
   toast.success('Phone number assigned successfully!');
  } catch (error) {
   console.error('Error assigning number:', error);
   toast.error('Failed to assign the phone number.');
  }
 };

 return (
  <form className="form">
   <div className="row">
    <div className="col-8 mt-2">
     <label>Select Phone Number</label>
     <select
      name="phoneNumber"
      value={selectedNumber}
      onChange={handleInputChange}
      className="form-control center"
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
       disabled={!selectedNumber} // Disable button if no number is selected
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
