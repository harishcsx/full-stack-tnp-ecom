import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <div className="price">${product.price}</div>
      <div className="rating">Rating: {product.rating}</div>
      <div className="card-actions">
        <Link to={`/product/${product.id}`} className="btn-view">
          View Product
        </Link>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
