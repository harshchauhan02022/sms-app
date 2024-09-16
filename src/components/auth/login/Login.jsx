import React, { useState, useEffect } from "react";
import "./Login.scss";
import auth from "../../../assets/images/auth.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../utils/toastUtils"; // Import showToast

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    useEffect(() => {
        setIsButtonDisabled(!(email && password));
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://192.168.29.20:9090/admin/log-in", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("role", response.data.role_TYPE[0].authority);
            showToast("Logged in successfully!", "success"); // Show success toast
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error", error);
            showToast("Error logging in! Please check your credentials.", "error"); // Show error toast
        }
    };

    return (
        <div className="authentication">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 centerMid">
                        <div>
                            <div className="text-center mb-5">
                                <h1>Welcome</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="authForm">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="inputField">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Your Email Address"
                                                className="form-control"
                                                value={email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="inputField">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Your Password"
                                                className="form-control"
                                                value={password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 my-3">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                role="switch"
                                                id="flexSwitchCheckChecked"
                                            />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button type="submit" className="btn btn-main" disabled={isButtonDisabled}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="col-12">
                                        <p>
                                            Don't have an account? <NavLink to="/signup">Signup</NavLink>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={auth} alt="Authentication Background" className="authBg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
