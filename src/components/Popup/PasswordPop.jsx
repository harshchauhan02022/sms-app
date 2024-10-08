import React, { useState } from 'react';
import './Popup.scss';
import { Modal, Button } from 'react-bootstrap';
import EditPassword from '../edit/EditPassword';

const PasswordPop = ({ user, Id }) => {
    console.log(Id);

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSave = (updatedUser) => {
        console.log('Updated Setting:', updatedUser);
        handleCloseModal(); // Close the modal after saving
    };

    return (
        <div>
            <Button className="Edit-button" onClick={handleShowModal}>
                Update Password
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditPassword user={user} id={Id} handleSave={handleSave} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PasswordPop;
