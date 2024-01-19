import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = ({ token }) => {
  const [productData, setProductData] = useState({
    category: "",
    brand: "",
    price: 0,
    quantity: 0,
    discount_type: "", // New state for discount type
    discount_value: 0,
    images: [],
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      images: [...productData.images, e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://growxcd.onrender.com/product/create",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product created successfully", response.data);
      navigate("/productList");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">List your Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Product Category:
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="E.g., Electronics, Fashion, Books, etc."
            required
          />
          <div className="form-text">
            Example: Electronics, Fashion, Books, etc. (Required)
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand:
          </label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            placeholder="E.g., Nike, Sony, Apple, etc."
            required
          />
          <div className="form-text">
            Example: Nike, Sony, Apple, etc. (Required)
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price ($):
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter the price"
            required
          />
          <div className="form-text">Example: 49.99 (Required)</div>
        </div>
        <div className="mb-3">
          <label htmlFor="discount_type" className="form-label">
            Discount Type:
          </label>
          <select
            className="form-control"
            id="discount_type"
            name="discount_type"
            value={productData.discount_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a discount type</option>
            <option value="flat">Flat Discount</option>
            <option value="percentage">Percentage Discount</option>
            <option value="buyonegetone">Buy One Get One Free</option>
          </select>
          <div className="form-text">Select the discount type (Required)</div>
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Images (URLs, separated by commas):
          </label>
          <input
            type="text"
            className="form-control"
            id="images"
            name="images"
            value={productData.images}
            onChange={handleImageChange}
            placeholder="E.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
          <div className="form-text">
            Example: https://example.com/image1.jpg,
            https://example.com/image2.jpg
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
      <p className="mt-3 text-muted">
        "Let your product shine, tell its tale, and find its way to the hearts
        of those who seek."
      </p>
    </div>
  );
};

export default CreateProduct;
