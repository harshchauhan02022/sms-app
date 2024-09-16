import React from "react";
import "./Sidebar.scss"

import { NavLink } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <section className={isSidebarOpen ? 'sidebar toggle' : 'sidebar'}>
            <div className="m-2">
                <h1>SMS APP</h1>
            </div>
            <div className="pageList">
                <div className="listItem">
                    <ul>
                        <NavLink to="/dashboard" className="mb-4"> <li>Home </li></NavLink>
                        <NavLink to="/AdminSms" className="mb-4"><li>SMS </li></NavLink>
                        <NavLink to="/AdminSettings"><li>Settings </li></NavLink>

                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Sidebar;