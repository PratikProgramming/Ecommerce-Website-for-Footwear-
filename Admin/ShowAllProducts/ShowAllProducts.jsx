import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";
import ProductImageGallery from "../../ProductImageGallery/ProductImageGallery";

const EditImagesModal = ({ product, onClose, onSave }) => {
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });

  useEffect(() => {
    if (product) {
      setImages({
        img1: product.img1 || "",
        img2: product.img2 || "",
        img3: product.img3 || "",
        img4: product.img4 || "",
        img5: product.img5 || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImages((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(images);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Images for Model No: {product.modelNo}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {[1, 2, 3, 4, 5].map((num) => (
              <div className="mb-3" key={num}>
                <label className="form-label">Image {num} URL</label>
                <input
                  type="text"
                  className="form-control"
                  name={`img${num}`}
                  value={images[`img${num}`]}
                  onChange={handleChange}
                  placeholder={`Enter Image ${num} URL`}
                />
                {images[`img${num}`] && (
                  <img
                    src={images[`img${num}`]}
                    alt={`Preview ${num}`}
                    style={{ maxWidth: "100%", maxHeight: "150px", marginTop: "5px" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedModelNos, setSelectedModelNos] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/products/getAllProducts`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchAllProducts();
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/products/search?name=${encodeURIComponent(searchName)}`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
      alert("Error searching products.");
    }
  };

  const handleCategoryFilter = async (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    if (!category) {
      fetchAllProducts();
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/products/category?category=${encodeURIComponent(category)}`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Category filter error:", err);
      alert("Error filtering by category.");
    }
  };

  const handleSubCategoryFilter = async (e) => {
    const subCategory = e.target.value;
    setFilterSubCategory(subCategory);
    if (!subCategory) {
      fetchAllProducts();
      return;
    }
    try {
      const res = await axios.get(`${baseUrl}/products/subcategory?subCategory=${encodeURIComponent(subCategory)}`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Subcategory filter error:", err);
      alert("Error filtering by subcategory.");
    }
  };

  const handleCheckboxChange = (modelNo) => {
    setSelectedModelNos((prev) =>
      prev.includes(modelNo) ? prev.filter((id) => id !== modelNo) : [...prev, modelNo]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedModelNos.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected products?")) return;

    try {
      await Promise.all(
        selectedModelNos.map((modelNo) =>
          axios.delete(`${baseUrl}/products/${modelNo}`)
        )
      );
      alert("Selected products deleted.");
      setSelectedModelNos([]);
      fetchAllProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting selected products.");
    }
  };

  const handleEditImages = (product) => {
    setEditProduct(product);
  };

  const closeEditModal = () => {
    setEditProduct(null);
  };

  const saveEditedImages = async (images) => {
    try {
      // Send only images object in PUT request
      await axios.put(`${baseUrl}/products/${editProduct.modelNo}/images`, images);
      alert("Product images updated successfully!");
      setEditProduct(null);
      fetchAllProducts();
    } catch (error) {
      console.error("Error updating product images:", error);
      alert("Failed to update product images.");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="fw-bold text-center mb-4">All Products</h2>

        <div className="row mb-4 align-items-end g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">Search by Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select"
              value={filterCategory}
              onChange={handleCategoryFilter}
            >
              <option value="">All</option>
              <option value="MEN">Men</option>
              <option value="WOMEN">Women</option>
              <option value="KIDS">Kids</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label fw-semibold">SubCategory</label>
            <select
              className="form-select"
              value={filterSubCategory}
              onChange={handleSubCategoryFilter}
            >
              <option value="">All</option>
              <option value="BOOTS">Boots</option>
              <option value="CASUAL">Casual</option>
              <option value="FORMALSHOES">Formal Shoes</option>
              <option value="SLIDERS">Sliders</option>
              <option value="SPORTSSHOES">Sports Shoes</option>
            </select>
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={handleSearch}
              disabled={!searchName.trim()}
            >
              Search
            </button>
            <button
              className="btn btn-danger flex-grow-1"
              onClick={handleDeleteSelected}
              disabled={selectedModelNos.length === 0}
            >
              Delete Selected
            </button>
          </div>
        </div>

        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered table-striped text-center table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Select</th>
                <th>Model No.</th>
                <th>Name</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Price</th>
                <th>Images</th>
                <th>Edit Images</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.modelNo}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedModelNos.includes(product.modelNo)}
                        onChange={() => handleCheckboxChange(product.modelNo)}
                      />
                    </td>
                    <td>{product.modelNo}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.subCategory}</td>
                    <td>₹{product.price.toFixed(2)}</td>
                    <td>
                      <ProductImageGallery images={[
                        product.img1,
                        product.img2,
                        product.img3,
                        product.img4,
                        product.img5
                      ]} />
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditImages(product)}
                      >
                        Edit Images
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editProduct && (
        <EditImagesModal
          product={editProduct}
          onClose={closeEditModal}
          onSave={saveEditedImages}
        />
      )}
    </>
  );
};

export default ShowAllProducts;
