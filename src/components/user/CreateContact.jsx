import React, { useState } from "react";
import axios from "axios";

const CreateContact = ({ onAddNewContact }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false); // To show a loading state
  const [error, setError] = useState(null); // To handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loading state
    setError(null); // Clear previous errors

    const token = localStorage.getItem("token"); // Get the token from localStorage
    const newContact = { phoneNumber };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user`,
        newContact,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      // Call the parent component's function to add the new contact to the contact list
      onAddNewContact(response.data);

      // Reset form fields
      setPhoneNumber("");
    } catch (error) {
      console.error("Error adding contact:", error);
      setError("Failed to add contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <h3>Add New Contact</h3> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 text-end"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Contact"}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateContact;
