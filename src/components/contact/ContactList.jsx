import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactPopup from "../Popup/ContactPopup";
import EditContactOffCanvas from "../canvas/EditContactOffCanvas";
import { toast } from "react-toastify";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isAdmin] = useState(true);
  const token = localStorage.getItem("token");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 8;

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.20:9090/phone/getAvailableNumbers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContacts(response.data);
    } catch (error) {
      toast.error(error);
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Function to handle deleting a contact
  //   const handleDelete = async (contactId) => {
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return (
  //           <div className="custom-ui">
  //             <h3>Delete Contact</h3>
  //             <p className="text-secondary mb-3">
  //               Are you sure you want to delete this contact?
  //             </p>
  //             <div className="gap-2 d-flex justify-content-end">
  //               <button
  //                 className="btn btn-sm btn-danger px-3 text-center"
  //                 onClick={onClose}
  //               >
  //                 No
  //               </button>
  //               <button
  //                 className="px-3 text-center btn btn-sm btn-success"
  //                 onClick={() => {
  //                   try {
  //                     // Send DELETE request with contact ID
  //                     axios.delete(
  //                       `http://192.168.29.20:9090/user/${contactId}`,
  //                       {
  //                         headers: {
  //                           Authorization: `Bearer ${token}`,
  //                         },
  //                       }
  //                     );
  //                     // Update the UI by removing the deleted contact
  //                     setContacts(
  //                       contacts.filter((contact) => contact.id !== contactId)
  //                     );
  //                     toast.success("Contact deleted successfully");
  //                   } catch (error) {
  //                     console.error("Error deleting contact:", error);
  //                     toast.error("Failed to delete contact");
  //                   }
  //                   onClose();
  //                 }}
  //               >
  //                 Yes
  //               </button>
  //             </div>
  //           </div>
  //         );
  //       },
  //     });
  //   };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-between">
        <h3>Contact List</h3>
        {isAdmin && <ContactPopup />}
      </div>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Phone Number</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.phoneNumber}</td>
                  {isAdmin && (
                    <td className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm ms-1"
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowOffCanvas(true);
                        }}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(contact.phoneNumber)} // Trigger delete on button click
                      >
                        Delete
                      </button> */}
                    </td>
                  )}
                </tr>
              ))
            ) : currentContacts.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="loading-container mt-4 ms-2 mb-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={isAdmin ? 2 : 1}>No contacts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Conditionally render pagination controls only if there are more than one page */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between mt-2">
          <button
            className="btn btn-secondary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &#60;
          </button>
          <span className="pagination-text">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &#62;
          </button>
        </div>
      )}

      <EditContactOffCanvas
        show={showOffCanvas}
        onHide={() => setShowOffCanvas(false)}
        contact={selectedContact}
        onSave={(updatedContact) => {
          setContacts(
            contacts.map((c) =>
              c.id === updatedContact.id ? updatedContact : c
            )
          );
          setShowOffCanvas(false);
        }}
      />
    </div>
  );
};

export default ContactList;
