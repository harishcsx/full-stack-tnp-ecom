import React from "react";

function CartItem({ item, updateQuantity, removeFromCart }) {
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <span>Quantity:</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.id, -1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(item.id, 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-subtotal">Subtotal: ${subtotal}</div>
      <button
        className="btn-danger"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
