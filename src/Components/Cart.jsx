import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Cart.css"; // Import your custom CSS file

const Cart = ({ product, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleDiscountApply = () => {
    const discountType = product.discount_type;
    const discountValue = product.discount_value;

    let discountedPrice = product.price * quantity;

    if (discountType === "flat") {
      discountedPrice -= discountValue;
    } else if (discountType === "percentage") {
      const discountAmount = (discountValue / 100) * (product.price * quantity);
      discountedPrice -= discountAmount;
    }

    setAppliedDiscount(discountedPrice);
  };

  return (
    <div className="cart-overlay">
      <div className="cart container">
        <h3 className="mt-2">Add to Cart</h3>
        <p className="mb-2">{product.brand}</p>
        <img
          src={product.images[0]}
          alt={product.brand}
          className="img-fluid mb-3"
        />
        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="form-control"
          />
        </div>
        <button onClick={handleDiscountApply} className="btn btn-primary mb-2">
          Apply Discount
        </button>
        {appliedDiscount !== null && (
          <p className="mb-2">
            Total Price after Discount: ₹{appliedDiscount.toFixed(2)}
          </p>
        )}
        <button onClick={() => onConfirm(quantity)} className="btn btn-success">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Cart;
