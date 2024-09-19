import React, { useState } from 'react';
import './Edit.scss';
import { Modal, Button } from 'react-bootstrap';
import EditSetting from './EditSetting';

const EditSettingPop = ({ user }) => {
 const [showModal, setShowModal] = useState(false);

 const [userData] = useState({
  email: 'john.doe@example.com',
 });

 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

 const handleSave = (updatedUser) => {
  console.log('Updated Setting:', updatedUser);
  handleCloseModal(); // Close the modal after saving
 };

 return (
  <div>
   <Button className="Edit-button" onClick={handleShowModal}>
    Update Email
   </Button>

   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Update Email</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <EditSetting user={userData} handleSave={handleSave} />
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default EditSettingPop;
