import React, { useState, useEffect } from "react";
import axios from "axios";


const CreateUser = () => {
 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  telephone: "",
  status: "",
  authorities: [],
 });
 const [isButtonDisabled, setIsButtonDisabled] = useState(true);
 const [successMessage, setSuccessMessage] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const token = localStorage.getItem("token");

 useEffect(() => {
  axios
   .get("http://192.168.29.20:9090/user", {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   })
   .then((response) => {
    setFormData({
     firstName: response.data.firstName || "",
     lastName: response.data.lastName || "",
     email: response.data.email || "",
     telephone: response.data.telephone || "",
     status: response.data.status || "",
     authorities: response.data.authorities || [],
    });
   })
   .catch((error) => {
    console.error("Error fetching data!", error);
   });
 }, [token]);

 useEffect(() => {
  const allFieldsFilled = Object.values(formData).every(
   (field) => field && (typeof field === "string" ? field.trim() !== "" : true)
  );
  setIsButtonDisabled(!allFieldsFilled);
 }, [formData]);

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "authorities") {
   setFormData({
    ...formData,
    authorities: value.split(",").map((authority) => ({
     authority: authority.trim(),
    })),
   });
  } else {
   setFormData({
    ...formData,
    [name]: value,
   });
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrorMessage("");
  try {
   const response = await axios.post(
    "http://192.168.29.20:9090/user",
    {
     ...formData,
     authorities: formData.authorities,
    },
    {
     headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
    }
   );
   console.log("User data added successfully:", response.data);
   setSuccessMessage("User registered successfully!");
   setFormData({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    telephone: "",
    status: "",
    authorities: [],
   });
  } catch (error) {
   console.error("There was an error submitting the form!", error);
   setErrorMessage("Error registering user! Please try again.");
  }
 };

 return (
  <form onSubmit={handleSubmit} className="form">
   <div className="row">
    {successMessage && (
     <div className="text-center mt-3">
      <p className="text-success">{successMessage}</p>
     </div>
    )}
    {errorMessage && (
     <div className="text-center mt-3">
      <p className="text-danger">{errorMessage}</p>
     </div>
    )}
    <div className="col-md-6">
     <div className="inputField">
      <label htmlFor="firstName">First name</label>
      <input
       type="text"
       name="firstName"
       className="form-control"
       placeholder="Enter First Name"
       value={formData.firstName}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="col-md-6">
     <div className="inputField">
      <label htmlFor="lastName">Last name</label>
      <input
       type="text"
       name="lastName"
       className="form-control"
       placeholder="Enter Last Name"
       value={formData.lastName}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="col-md-6">
     <div className="inputField">
      <label htmlFor="email">Email</label>
      <input
       type="email"
       name="email"
       className="form-control"
       placeholder="Enter Email"
       value={formData.email}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="col-md-6">
     <div className="inputField">
      <label htmlFor="password">Password</label>
      <input
       type="password"
       name="password"
       className="form-control"
       placeholder="Enter Password"
       value={formData.password}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="col-md-6">
     <div className="inputField">
      <label htmlFor="telephone">Telephone</label>
      <input
       type="text"
       name="telephone"
       className="form-control"
       placeholder="Enter Phone Number"
       value={formData.telephone}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="col-12">
     <div className="inputField">
      <label htmlFor="status">Status</label>
      <input
       type="text"
       name="status"
       className="form-control"
       placeholder="Status"
       value={formData.status}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="col-12">
     <div className="inputField">
      <label htmlFor="authorities">Authorities</label>
      <input
       type="text"
       name="authorities"
       className="form-control"
       placeholder="Authorities (comma-separated)"
       value={formData.authorities.map((auth) => auth.authority).join(", ")}
       onChange={handleChange}
      />
     </div>
    </div>
    <div className="text-center mt-5">
     <button
      type="submit"
      className="btn btn-lg btn-dark"
      disabled={isButtonDisabled}
     >
      Submit
     </button>
    </div>
   </div>
  </form>
 );
}

export default CreateUser