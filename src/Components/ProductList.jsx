import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cart from "../Components/Cart";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ProductList.css";
import NavigationBar from "./NavBar";
import Contact from "./Contact";
import FooterContainer from "./FooterContainer";

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("price");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [showDiscountOptions, setShowDiscountOptions] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://growxcd.onrender.com/product/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    // Apply sorting based on sortOption
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price;
      } else {
        // Add more sorting options if needed
        return 0;
      }
    });

    setProducts(sortedProducts);
  }, [sortOption, filteredProducts]);

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    if (category === "") {
      setFilteredProducts(products); // Reset filter
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);

    // Random logic to determine the discount option
    const randomNum = Math.random();
    if (randomNum < 0.3) {
      setDiscount(100); // 30% chance for a flat discount of 100 Rs
    } else if (randomNum < 0.6) {
      setDiscount((10 / 100) * product.price); // 30% chance for a 10% discount
    } else {
      setDiscount(0); // 40% chance for no discount
    }

    setShowDiscountOptions(true);
    setCart([...cart, { ...product, quantity: 1, discount }]);

    // Display a success toast for "Add to Cart"
    toast.success(`${product.brand} added to the cart successfully!`);
  };

  const handleConfirmAddToCart = (quantity) => {
    // Perform any additional logic if needed
    // For now, we are just updating the quantity in the cart
    const updatedCart = cart.map((item) =>
      item._id === selectedProduct._id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    setSelectedProduct(null);
    setShowDiscountOptions(false);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const handleShowCartModal = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      const itemDiscount = item.discount * item.quantity;
      totalPrice += itemPrice - itemDiscount;
    });
    return totalPrice;
  };

  const handleCheckout = () => {
    setShowCartModal(false);

    // Generate bill
    const formattedBill = cart.map((item) => ({
      brand: item.brand,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount,
      subtotal: (item.price - item.discount) * item.quantity,
    }));

    setBill(formattedBill);
    setShowBillModal(true);

    // Display a success toast for "Checkout"
    toast.success("Checkout successful!");

    // Automatically hide the bill after 10 seconds
    setTimeout(() => {
      setShowBillModal(false);
      setBill(null);
    }, 10000);
  };

  return (
    <div className="container mt-5">
      <NavigationBar />
      <h2>
        Shopping Begins with{" "}
        <i class="fa-solid fa-tag" style={{ color: "orange" }}></i>
        <span style={{ color: "orange" }}>ARRA</span>
      </h2>
      <Link to="/createProducts">
        <button className="btn btn-primary mb-3 text-right">
          Do you want to sell something?
        </button>
      </Link>
      {/* Display cart icon and count */}
      <div className="cart-icon">
        <button onClick={handleShowCartModal}>
          <i class="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cart.length}</span>
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="col">
            <div className="card">
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={`Product: ${product.category}`}
              />
              <div className="card-body">
                <h5 className="card-title">{product.brand}</h5>
                <p className="card-text">₹{product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {selectedProduct && showDiscountOptions && (
        <div className="discount-options">
          <p>Available Discounts:</p>
          <ul>
            <li>Flat Discount: Rs 100</li>
            <li>Percentage Discount: 10%</li>
            <li>No Discount</li>
          </ul>
        </div>
      )} */}

      {/* Cart Modal */}
      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.brand} - Quantity: {item.quantity}
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="btn btn-danger btn-sm ms-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p>Total Price: ₹{calculateTotalPrice().toFixed(2)}</p>
              <p>
                Total Discount: ₹
                {cart
                  .reduce((acc, item) => acc + item.discount * item.quantity, 0)
                  .toFixed(2)}
              </p>
              <p>
                Final Price: ₹
                {(
                  calculateTotalPrice() -
                  cart.reduce(
                    (acc, item) => acc + item.discount * item.quantity,
                    0
                  )
                ).toFixed(2)}
              </p>
            </div>
            <Button variant="secondary" onClick={handleCloseCartModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Bill Modal */}
      <Modal show={showBillModal} onHide={() => setShowBillModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {bill &&
              bill.map((item, index) => (
                <li key={index}>
                  {item.brand} - Quantity: {item.quantity} - Subtotal: ₹
                  {item.subtotal.toFixed(2)}
                </li>
              ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBillModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      <Contact />
      <FooterContainer />
    </div>
  );
};

export default ProductList;
