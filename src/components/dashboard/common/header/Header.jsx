import React from "react";
import "./Header.scss";
import { FaBell } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import Profile from "../../../../assets/images/profile.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ toggle, userEmail, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="justify-content-md-end">
            <div className="toggle d-xl-none d-block" onClick={toggle}>
                <CiMenuBurger />
            </div>
            <div className="tools">
                <div className="dropup-center dropdown">
                    <div className="icon cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaBell fill="#1f2733" />
                    </div>
                    <ul className="dropdown-menu p-0 mt-3">
                        <div className="card p-0 shadow">
                            <div className="card-header fw-bold">Notifications</div>
                            <li><button className="dropdown-item">Lorem ipsum dolor sit amet.</button></li>
                            <li><button className="dropdown-item">Lorem ipsum dolor sit amet consectetur.</button></li>
                            <li><button className="dropdown-item">Lorem, ipsum dolor.</button></li>
                            <div className="card-footer"><NavLink>View All</NavLink></div>
                        </div>
                    </ul>
                </div>
                {/* Uncomment if search functionality is needed */}
                {/* <div className="search">
                    <IoSearch />
                    <input type="text" className="form-control" placeholder="Type Here" />
                </div> */}
                <div className="dropdown">
                    <div className="auth dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className="profile">
                            <div className="img">
                                <img src={Profile} alt="Profile" />
                            </div>
                            <div className="name">
                                <p className="userEmail">{userEmail}</p>
                            </div>
                        </div>
                    </div>
                    <ul className="dropdown-menu mt-2 shadow" aria-labelledby="dropdownMenuButton1">
                        <li><NavLink className="dropdown-item" to="profile">Profile</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/">Settings</NavLink></li>
                        <li><NavLink className="dropdown-item" onClick={handleLogout} to="/">Logout</NavLink></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
