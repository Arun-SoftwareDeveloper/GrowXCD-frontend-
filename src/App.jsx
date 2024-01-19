// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CreateProduct from "./Components/CreateProduct";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import ProductList from "./Components/ProductList";
import Dashboard from "./Components/DashBoard";

function App() {
  const [token, setToken] = useState("");

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleRegister = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    // Your logic for navigation based on token
    // For example, redirect to login if the user is not authenticated
    if (!token) {
      console.log("Redirecting to login...");
      // Uncomment the line below when you have your login logic in place
      // return <Navigate to="/login" />;
    }
  }, [token]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/productList" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/register"
            element={
              token ? (
                <Navigate to="/createProducts" />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />
          <Route path="/" element={<Dashboard />} />

          <Route
            path="createProducts" // Remove the leading slash
            element={
              token ? <CreateProduct token={token} /> : <Navigate to="/login" />
            }
          />

          <Route
            path="productList" // Remove the leading slash
            element={<ProductList token={token} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
