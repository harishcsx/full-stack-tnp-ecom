import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = "https://dummyjson.com";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await response.json();
      setProduct(data);
      setSelectedImage(data.thumbnail || (data.images && data.images[0]));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <Link to="/" className="back-link">&larr; Back to Products</Link>
        <div className="error-message">
          <p>Failed to load product details.</p>
          <button onClick={fetchProductDetails}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">&larr; Back to Products</Link>

      <div className="product-details-container">
        <div className="product-details-image">
          <img src={selectedImage} alt={product.title} />
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className={selectedImage === imgUrl ? "active" : ""}
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-details-info">
          <h1>{product.title}</h1>
          {product.brand && (
            <div className="meta-info"><strong>Brand:</strong> {product.brand}</div>
          )}
          <div className="meta-info"><strong>Category:</strong> {product.category}</div>
          
          <div className="price">${product.price}</div>
          <div className="meta-info"><strong>Rating:</strong> {product.rating}</div>
          <div className="meta-info"><strong>Stock:</strong> {product.stock} items</div>

          <p><strong>Description:</strong><br />{product.description}</p>

          <button
            style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
