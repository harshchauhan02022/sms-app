import React, { useState, useEffect } from 'react';
import './Edit.scss';
import { Modal, Button } from 'react-bootstrap';
import AssignNumber from './AssignNumber';
import axios from 'axios';

const AssignNumberPopup = ({ user }) => {
 const [showModal, setShowModal] = useState(false);
 const [selectedUser, setSelectedUser] = useState(user);
 const [availableNumbers, setAvailableNumbers] = useState([]);


 const fetchAvailableNumbers = async () => {
    try {
     const token = localStorage.getItem("token");
     const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/phone/getAvailableNumbers`, {
      headers: {
       Authorization: `Bearer ${token}`
      }
     });
     setAvailableNumbers(response.data);
    } catch (error) {
     console.error('Error fetching available numbers:', error);
    }
   };

   
 useEffect(() => {
  fetchAvailableNumbers();
 }, []);

 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

 const handleSave = (updatedUser) => {
  setSelectedUser(updatedUser);
  handleCloseModal();
 };

 return (
  <div>
   <Button className="Edit-button" onClick={handleShowModal}>
    Assign
   </Button>

   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Assign Number</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <AssignNumber user={selectedUser} availableNumbers={availableNumbers} handleSave={handleSave} />
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default AssignNumberPopup;
