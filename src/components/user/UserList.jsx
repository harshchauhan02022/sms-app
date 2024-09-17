import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.scss";
import EditPopup from "../edit/EditPopup";
import UserPopup from "../Popup/UserPopup";
import AssignNumberPopup from "../assign/AssignNumberPopup";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

function UserList() {
  const [userData, setUserData] = useState([]);
  const [isAdmin] = useState(true);
  const token = localStorage.getItem("token");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const userDataPerPage = 7;

  // Fetch user data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.29.20:9090/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDelete = async (userId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h3>Delete User</h3>
            <p className="text-secondary mb-3">Are you sure you want to delete this user?</p>
            <div className="gap-2 d-flex justify-content-end">
            <button className="btn btn-sm btn-danger px-3 text-center" onClick={onClose}>No</button>
            <button
            className="px-3 text-center btn btn-sm btn-success"
              onClick={() => {
                try {
                  axios.delete(`http://192.168.29.20:9090/user/${userId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  setUserData(userData.filter((user) => user.id !== userId));
                  toast.success("User deleted successfully");
                  fetchData();
                } catch (error) {
                  console.error(
                    "Error deleting user:",
                    error.response ? error.response.data : error
                  );
                  toast.error("Failed to delete user");
                }
                onClose();
              }}
            >
              Yes
            </button>
            </div>
          
          </div>
        );
      },
    });
  };

  // Handle saving the updated user after editing
//   const handleSave = (updatedUser) => {
//     if (updatedUser) {
//       setUserData((prevData) =>
//         prevData.map((user) =>
//           user.id === updatedUser.id ? updatedUser : user
//         )
//       );
//     }
//   };

  const handleSave = async (updatedUser) => {
    if (updatedUser) {
      await fetchData(); // Refetch the entire list to ensure it's updated
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * userDataPerPage;
  const indexOfFirstUser = indexOfLastUser - userDataPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userData.length / userDataPerPage);

  // Adjust page if the current page has no users after deletion
  useEffect(() => {
    if (userData.length > 0 && currentUsers.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentUsers, currentPage, userData]);

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

  // This function will refresh the user data after a new user is created
  const refreshUserData = () => {
    fetchData();
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-between">
        <h3>User List</h3>
        {isAdmin && <UserPopup onSuccess={refreshUserData} />}
      </div>
      <div className="table-responsive height-set">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Telephone</th>
              <th scope="col">Status</th>
              <th scope="col">Authorities</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.telephone}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.authorities.map((auth, index) => (
                      <span key={index}>{auth.authority}</span>
                    ))}
                  </td>
                  <td className="d-flex justify-content-between">
                    <AssignNumberPopup />

                    <EditPopup user={user} handleSave={handleSave} />

                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : userData.length === 0 ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="7">No more users on this page</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show pagination only if there is more data than can fit on one page */}
      {userData.length > userDataPerPage && (
        <div className="d-flex justify-content-center mt-2">
          <button
            className="btn btn-secondary mr-4 me-4"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &#60;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary ml-3 ms-4"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &#62;
          </button>
        </div>
      )}
    </div>
  );
}

export default UserList;
