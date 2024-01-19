// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        formData
      );

      const token = response.data.token;
      onLogin(token);
      console.log("Login successful. Token:", token);

      // Redirect to the product list page after successful login
      navigate("/productList");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginUsername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="loginUsername"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mt-3">
        <p>
          "Discover amazing products and exclusive deals. Login to explore a
          world of shopping at your fingertips."
        </p>
        <p>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
