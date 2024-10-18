import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button, Table } from "react-bootstrap";
import axios from "axios";

const EditContactOffCanvas = ({ show, onHide, contact, onSave }) => {
  const [fields, setFields] = useState({});
  const [newField, setNewField] = useState({ key: "", value: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (contact && contact.messageResponse) {
      setFields(contact.messageResponse);
    } else {
      setFields({});
    }
  }, [contact]);

  const handleChange = (key, value) => {
    setFields({ ...fields, [key]: value });
  };

  const handleAddField = () => {
    if (newField.key) {
      setFields({ ...fields, [newField.key]: newField.value });
      setNewField({ key: "", value: "" });
    }
  };

  const handleRemoveField = (key) => {
    const newFields = { ...fields };
    delete newFields[key];
    setFields(newFields);
  };

  const handleSave = async () => {
    const payload = {
      messageResponse: { ...fields },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/phone/message-response/${contact.phoneNumber}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSave(response.data);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Contact</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Inbound</th>
              <th>Outbound</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(fields).length === 0 ? (
              <tr className="bg-white text-dark">
                <td colSpan="7">
                <p className="mt-3 text-center">No messages available</p>
                </td>
              </tr>
              
            ) : (
              Object.entries(fields).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveField(key)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Form.Group className="mb-3">
          <Form.Label>New Field</Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              placeholder="Key"
              value={newField.key}
              onChange={(e) =>
                setNewField({ ...newField, key: e.target.value })
              }
            />
            <Form.Control
              type="text"
              placeholder="Value"
              value={newField.value}
              onChange={(e) =>
                setNewField({ ...newField, value: e.target.value })
              }
              className="ms-2"
            />
          </div>
          <Button variant="secondary" onClick={handleAddField}>
            Add Field
          </Button>
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditContactOffCanvas;
