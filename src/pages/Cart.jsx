import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  // Dynamically calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container cart-page">
        <h1>Shopping Cart</h1>
        <div className="empty-message">
          <p>Your cart is empty.</p>
          <Link to="/">
            <button style={{ marginTop: "10px" }}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total-text">
          Total: ${total.toFixed(2)}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-danger" onClick={clearCart}>
            Clear Cart
          </button>
          <Link to="/">
            <button>Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
