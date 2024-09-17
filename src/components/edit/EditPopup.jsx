import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EditUser from './EditUser';

const EditPopup = ({ user, handleSave }) => {
 const [showModal, setShowModal] = useState(false);

 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

 // This will handle the saving action and update the user list
 const handleSaveUser = (updatedUser) => {
  if (updatedUser) {
   handleSave(updatedUser); // Propagate the updated user data to parent
  }
  handleCloseModal(); // Close the modal after saving
 };

 return (
  <div>
   <Button className="Edit-button" onClick={handleShowModal}>
    Edit
   </Button>

   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Edit User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <EditUser user={user} handleSave={handleSaveUser} />
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default EditPopup;
