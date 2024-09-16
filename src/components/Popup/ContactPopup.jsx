import React, { useState } from 'react';
import './Popup.scss';
import { Modal, Button } from 'react-bootstrap';
import CreateContact from '../user/CreateContact';

const ContactPopup = () => {
 const [showModal, setShowModal] = useState(false);
 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

 return (
  <div>
   <Button className="Create-button" onClick={handleShowModal}>
    Create No
   </Button>
   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Create New Contact</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <CreateContact />
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default ContactPopup;
