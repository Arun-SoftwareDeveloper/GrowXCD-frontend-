import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../FormsStyles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://growxcd.onrender.com/auth/register", formData);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error(
          "Registration failed with status code:",
          error.response.status
        );
        console.error("Server response:", error.response.data);
        toast.error("Registration failed. Please try again.");
      } else if (error.request) {
        console.error("No response received from the server");
        toast.error("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error("Error setting up the request. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5 register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <label htmlFor="registerUsername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="registerUsername"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Password:</label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <p className="register-quote">
          "Join us and discover a world of incredible products at your
          fingertips."
        </p>
        <p>
          Already a User? <Link to="/login">Login Here</Link>
        </p>
      </form>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Register;
