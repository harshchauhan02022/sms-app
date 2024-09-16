import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.scss';
import EditPopup from '../edit/EditPopup';
import UserPopup from '../Popup/UserPopup';
import AssignNumberPopup from '../assign/AssignNumberPopup';

function UserList() {
    const [showModal, setShowModal] = useState({ show: false, userId: null });
    const [userData, setUserData] = useState([]);
    const [isAdmin] = useState(true);
    const token = localStorage.getItem('token');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const userDataPerPage = 7;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.29.20:9090/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error);
            }
        };

        fetchData();
    }, [token]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://192.168.29.20:9090/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(userData.filter(user => user.id !== userId));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error);
            alert('Failed to delete user');
        }
    };

    const indexOfLastUser = currentPage * userDataPerPage;
    const indexOfFirstUser = indexOfLastUser - userDataPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(userData.length / userDataPerPage);

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

    const handleEditClick = (userId) => {
        setShowModal({ show: true, userId });
    };

    const handleSave = (updatedUser) => {
        if (updatedUser) {
            setUserData(userData.map(user => user.id === updatedUser.id ? updatedUser : user));
        }
        setShowModal({ show: false, userId: null });
    };

    return (
        <div className="row">
            <div className="d-flex justify-content-between">
                <h3>User List</h3>
                {isAdmin && (
                    <UserPopup />
                )}
            </div>
            <div className="table-responsive">
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
                                    <td>{user.authorities.map((auth, index) => (
                                        <span key={index}>{auth.authority}</span>
                                    ))}</td>
                                    <td className="d-flex justify-content-between">
                                        <AssignNumberPopup />

                                        <EditPopup
                                            show={showModal.show}
                                            userId={showModal.userId}
                                            handleSave={handleSave}
                                        />

                                        <button
                                            className="btn btn-danger btn-sm ml-2"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination with Bootstrap icons */}
            <div className="d-flex justify-content-center mt-2">
                <button
                    className="btn btn-secondary mr-4"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    &#60;
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary ml-3"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    &#62;
                </button>
            </div>
        </div>
    );
}

export default UserList;
