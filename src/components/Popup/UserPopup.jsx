import React, { useEffect, useState } from 'react';
import './Popup.scss';
import { Modal, Button } from 'react-bootstrap';
import CreateUser from '../user/CreateUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPopup = ({ onSuccess }) => {
 const [showModal, setShowModal] = useState(false);

  // Call onSuccess when user is created successfully, then close the modal
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();  // Trigger the refresh function from UserList
    }
    handleCloseModal(); // Close the modal
  };

 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false); 

 return (
  <div>
   <Button className="Create-button mb-3" onClick={handleShowModal}>
    Create User
   </Button>
   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Add New User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <CreateUser onSuccess={handleSuccess}/>
    </Modal.Body>
   </Modal>
   <ToastContainer position="top-right" hideProgressBar autoClose={3000}/>
  </div>
 );
};

export default UserPopup;
