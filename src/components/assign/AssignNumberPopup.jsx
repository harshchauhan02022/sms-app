import React, { useState, useEffect } from 'react';
import './Edit.scss';
import { Modal, Button } from 'react-bootstrap';
import AssignNumber from './AssignNumber';
import axios from 'axios';

const AssignNumberPopup = ({ user }) => {
 const [showModal, setShowModal] = useState(false);
 const [selectedUser, setSelectedUser] = useState(user);
 const [availableNumbers, setAvailableNumbers] = useState([]);

 useEffect(() => {
  const fetchAvailableNumbers = async () => {
   try {
    const token = localStorage.getItem("token");
    const response = await axios.get('http://192.168.29.20:9090/phone/getAvailableNumbers', {
     headers: {
      Authorization: `Bearer ${token}`
     }
    });
    setAvailableNumbers(response.data);
   } catch (error) {
    console.error('Error fetching available numbers:', error);
   }
  };

  fetchAvailableNumbers();
 }, []);

 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

 const handleSave = (updatedUser) => {
  console.log('Updated User:', updatedUser);
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
