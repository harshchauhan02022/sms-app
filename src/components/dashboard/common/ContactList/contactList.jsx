import React, { useEffect, useState } from "react"
import axios from "axios"
import "./ContactList.scss"
import ContactPopup from "../../../Popup/ContactPopup"
import EditContactOffCanvas from "../../../canvas/EditContactOffCanvas"

const ContactList = () => {
  const [contacts, setContacts] = useState([])
  const [isAdmin] = useState(true)
  const token = localStorage.getItem("token")

  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://192.168.29.20:9090/phone/getAvailableNumbers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response.data)
        setContacts(response.data)
      } catch (error) {
        console.error("Error fetching contacts:", error)
      }
    }

    fetchContacts()
  }, [token])

  // Function to handle deleting a contact
  const handleDelete = async (contactId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    )
    if (!confirmDelete) return

    try {
      // Send DELETE request with contact ID
      await axios.delete(`http://192.168.29.20:9090/user/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Update the UI by removing the deleted contact
      setContacts(contacts.filter((contact) => contact.id !== contactId))
      alert("Contact deleted successfully")
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert("Failed to delete contact")
    }
  }
  return (
    <div className="row">
      <div className="d-flex justify-content-between">
        <h3>Contact List</h3>
        {isAdmin && <ContactPopup />}
      </div>
      <div className="table-responsive mt-3 ">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Phone Number</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.phoneNumber}</td>
                  {isAdmin && (
                    <td className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm ms-1"
                        onClick={() => {
                          setSelectedContact(contact)
                          setShowOffCanvas(true)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(contact.id)} // Trigger delete on button click
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 2 : 1}>No contacts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditContactOffCanvas
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        contact={selectedContact}
        onSave={(updatedContact) => {
          // Update the contact in the contacts array
          setContacts(
            contacts.map((c) =>
              c.id === updatedContact.id ? updatedContact : c
            )
          )
          setShowOffCanvas(false)
        }}
      />
    </div>
  )
}

export default ContactList
