import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const EditContactOffCanvas = ({ show, onHide, contact, onSave }) => {
  const [fields, setFields] = useState({});
  const [newField, setNewField] = useState({ key: '', value: '' });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (contact) {
      setFields(contact);
    }
  }, [contact]);

  const handleChange = (key, value) => {
    setFields({ ...fields, [key]: value });
  };

  const handleAddField = () => {
    if (newField.key) {
      setFields({ ...fields, [newField.key]: newField.value });
      setNewField({ key: '', value: '' });
    }
  };

  const handleRemoveField = (key) => {
    const newFields = { ...fields };
    delete newFields[key];
    setFields(newFields);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://192.168.29.20:9090/phone/${contact.id}`, fields, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onSave(response.data);
    } catch (error) {
      console.error('Error updating contact:', error);
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
              <th>Key</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(fields).map(([key, value]) => (
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
                  <Button variant="danger" size="sm" onClick={() => handleRemoveField(key)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <Form.Group className="mb-3">
          <Form.Label>New Field</Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              placeholder="Key"
              value={newField.key}
              onChange={(e) => setNewField({ ...newField, key: e.target.value })}
            />
            <Form.Control
              type="text"
              placeholder="Value"
              value={newField.value}
              onChange={(e) => setNewField({ ...newField, value: e.target.value })}
              className="ms-2"
            />
          </div>
          <Button variant="secondary" onClick={handleAddField}>Add Field</Button>
        </Form.Group>
        
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditContactOffCanvas;
