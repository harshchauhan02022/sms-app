import React, { useState } from 'react';
import './Edit.scss';
import { Modal, Button } from 'react-bootstrap';
import EditUser from './EditUser';

const EditPopup = ({ user }) => {
 const [showModal, setShowModal] = useState(false);
 const [selectedUser, setSelectedUser] = useState(user);

 const [userData, setUserData] = useState({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  telephone: '1234567890',
  status: 'Active'
 });

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
    Edit
   </Button>

   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Edit User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <EditUser user={userData} handleSave={handleSave} />
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default EditPopup;
