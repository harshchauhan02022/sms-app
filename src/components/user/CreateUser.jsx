import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./CreateUser.scss";
import { toast } from "react-toastify";

const CreateUser = ({ onSuccess }) => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    telephone: "",
    status: "",
    authorities: [],
  });

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    axios
      .get("http://192.168.29.20:9090/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFormData(response.data);
        // Use setValue to update form values when data is fetched
        setValue("firstName", response.data.firstName || "");
        setValue("lastName", response.data.lastName || "");
        setValue("email", response.data.email || "");
        setValue("telephone", response.data.telephone || "");
        setValue("status", response.data.status || "");
        setValue(
          "authorities",
          response.data.authorities.map((auth) => auth.authority).join(", ") ||
            ""
        );
      })
      .catch((error) => {
        console.error("Error fetching data!", error);
      });
  }, [token, setValue]);

  const onSubmit = async (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      telephone,
      status,
      authorities,
    } = data;

    try {
      const response = await axios.post(
        "http://192.168.29.20:9090/user",
        {
          firstName,
          lastName,
          email,
          password,
          telephone,
          status,
          authorities: authorities.split(",").map((authority) => ({
            authority: authority.trim(),
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User registered successfully!");
      if (onSuccess) onSuccess(); // Close the popup
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("Error registering user! Please try again.");
    }
  };

  // Custom handler for phone input validation
  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      telephone: value, // 'value' contains the full phone number including the country code
    }));
    setValue("telephone", value);
  
    if (!value || value.length < 8) {
      setError("telephone", {
        type: "manual",
        message: "Phone number should have at least 8 digits",
      });
    } else {
      clearErrors("telephone");
    }
  };
  

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="row">
        <div className="col-md-6">
          <div className="inputField">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-danger errors">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="inputField">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-danger errors">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="inputField">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              autoComplete="off"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger errors">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="inputField">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                className="form-control"
                placeholder="Enter Password"
                autoComplete="new-password"
                maxLength={6}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                {/* Icon for visibility */}
              </span>
            </div>
            {errors.password && (
              <p className="text-danger errors">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="col-md-12">
          <div className="inputField">
            <label htmlFor="telephone">Telephone</label>
            {/* <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              {...register("telephone", { required: "Telephone is required" , maxLength: {
                value: 8,
                message: "Minimum 8 characters are allowed!"
              }})}
            /> */}

            <PhoneInput
              inputProps={{
                name: "telephone",
                required: true,
              }}
              enableSearch
              value={formData.telephone}
              onChange={handlePhoneChange}
              country={"us"}
            />

            {errors.telephone && (
              <p className="text-danger errors">{errors.telephone.message}</p>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="inputField">
            <label htmlFor="status">Status</label>
            <select
              className="form-select"
              {...register("status", { required: "Status is required" })}
            >
              <option value="" disabled selected>
                Select status
              </option>
              <option value="ENABLED">ENABLED</option>
              <option value="DISABLED">DISABLED</option>
            </select>
            {errors.status && (
              <p className="text-danger errors">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="col-12">
          <div className="inputField">
            <label htmlFor="authorities">Authorities</label>
            <select
              className="form-select"
              {...register("authorities", {
                required: "Authorities are required",
              })}
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
            {errors.authorities && (
              <p className="text-danger errors">{errors.authorities.message}</p>
            )}
          </div>
        </div>

        <div className="text-center mt-5">
          <button type="submit" className="btn btn-lg btn-dark">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateUser;
