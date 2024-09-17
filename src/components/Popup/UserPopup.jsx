import React, { useState } from 'react';
import './Popup.scss';
import { Modal, Button } from 'react-bootstrap';
import CreateUser from '../user/CreateUser';

const UserPopup = () => {
 const [showModal, setShowModal] = useState(false);

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
     <CreateUser onSuccess={handleCloseModal} />
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default UserPopup;
