import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";

const EditUser = ({ user, handleSave }) => {
  const [formData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    status: user?.status || "",
    id: user?.id || "",
  });

  const token = localStorage.getItem("token");

  // Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: formData,
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Sending PUT request to update the user
      const response = await axios.put(
        `http://192.168.29.20:9090/user/edit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the request was successful and return the updated user
      if (response.status === 200) {
        console.log("Updated user data:", response.data); 
        toast.success("User updated successfully!");
        handleSave(response.data); // Trigger parent update
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        toast.error(
          `Error: ${
            error.response.data?.message ||
            "Failed to update user. Please check the details."
          }`
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("Error setting up the request. Please check your code.");
      }
    }
  };

  const handlePhoneChange = (value) => {
    setValue("telephone", value); // Update telephone with full value (including country code)
    if (!value || value.length < 8) {
      setError("telephone", {
        type: "manual",
        message: "Phone number should have at least 8 digits",
      });
    } else {
      clearErrors("telephone");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="form-control"
          />
          {errors.firstName && (
            <p className="text-danger errors">{errors.firstName.message}</p>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className="form-control"
          />
          {errors.lastName && (
            <p className="text-danger errors">{errors.lastName.message}</p>
          )}
        </div>
        <div className="col-12">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="form-control"
          />
          {errors.email && (
            <p className="text-danger errors">{errors.email.message}</p>
          )}
        </div>
        <div className="col-12 mt-3">
          <label>Telephone</label>
          <PhoneInput
            inputProps={{
              name: "telephone",
              required: true,
            }}
            enableSearch
            {...register("telephone", {
              required: "Telephone is required",
              validate: (value) =>
                value.length >= 8 || "Phone number should have at least 8 digits",
            })}
            value={formData.telephone}
            onChange={handlePhoneChange}
            country={"us"}
          />
          {errors.telephone && (
            <p className="text-danger errors">{errors.telephone.message}</p>
          )}
        </div>
        <div className="col-12 mt-3">
          <label>Status</label>
          <select
            className="form-select"
            {...register("status", { required: "Status is required" })}
          >
            <option value="" disabled>
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
      <button type="submit" className="btn btn-primary mt-4">
        Save Changes
      </button>
    </form>
  );
};

export default EditUser;
