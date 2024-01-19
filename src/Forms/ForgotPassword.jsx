import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backendApi from "../BackendServerApi";

const ForgotPassword = ({ onSwitchAuthStep }) => {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validation
    let valid = true;
    const newErrors = { email: "" };

    if (!email.trim()) {
      valid = false;
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    if (!valid) {
      return;
    }

    try {
      // Make API request to initiate password reset
      const response = await axios.post(`${backendApi}/forgotPassword`, {
        email,
      });
      toast.success("Password reset email sent", { position: "top-right" });
    } catch (error) {
      toast.error("Error initiating password reset. Please try again.", {
        position: "top-right",
      });
      console.error("Error initiating password reset:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="header-container">
          <p style={{ fontFamily: "cursive", float: "left", color: "orange" }}>
            <i class="fa-solid fa-tag" style={{ color: "orange" }}></i>
            ARRA
          </p>
        </div>

        <div className="col-md-6">
          <img
            src={
              "https://img.freepik.com/free-photo/top-view-women-man-accessoires-travel-concept-white-black-mobile-phone-airplane-hat-passport-watch-sunglasses-shoes-key-wood-table_1921-50.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697068800&semt=ais"
            }
            style={{ width: "100%", height: "auto", borderRadius: "7px" }}
            alt="Fashion Model"
          />
          <br />
          <br />
          <h5 style={{ fontFamily: "cursive" }}>
            Recover Your Style: Reset Your Password and Rediscover Seamless
            Shopping!
          </h5>
        </div>
        <div className="col-md-6">
          <form className="auth-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleForgotPassword}
            >
              Reset Password
            </button>
            <p>
              Remember your password?{" "}
              <Link to="/login">
                <span onClick={() => onSwitchAuthStep("login")}>Login</span>
              </Link>
            </p>

            {/* Toast Container */}
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
