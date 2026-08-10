import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const API_BASE_URL = "https://dummyjson.com";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch initial product listing
  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch category list
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category-list`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Could not load categories", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle Search API call
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }
    setLoading(true);
    setError(false);
    setSelectedCategory(""); // Reset category when searching
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/search?q=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search products");
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle Category Filter call
  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSearchTerm(""); // Reset search term when category selected
    setLoading(true);
    setError(false);

    if (!category) {
      fetchProducts();
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/products/category/${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category products");
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedCategory("");
    fetchProducts();
  };

  return (
    <div className="container">
      <h2>Products</h2>

      {/* Search and Category Filter Bar */}
      <div className="search-section">
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span>Search products:</span>
          <input
            type="text"
            className="search-input"
            placeholder="Type product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {categories.length > 0 && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span>Category:</span>
            <select
              className="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => {
                const categoryValue = typeof cat === "string" ? cat : cat.slug || cat.name;
                const categoryName = typeof cat === "string" ? cat : cat.name || cat.slug;
                return (
                  <option key={index} value={categoryValue}>
                    {categoryName}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {(searchTerm || selectedCategory) && (
          <button onClick={handleClear}>Clear Filter</button>
        )}
      </div>

      {/* Main Content State Rendering */}
      {loading && <div className="loading">Loading products...</div>}

      {error && !loading && (
        <div className="error-message">
          <p>Failed to load products.</p>
          <button onClick={fetchProducts}>Try Again</button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="empty-message">No products found.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
