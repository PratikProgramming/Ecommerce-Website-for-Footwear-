import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "./add-product-animation.json"; // Your Lottie animation JSON
import baseUrl from "../../baseUrl/baseUrl"; // Base URL for API requests

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    quantity: "",
    price: "",
    category: "",
    subCategory: "",
    description: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });

  const subcategories = {
    MEN: ["BOOTS", "CASUAL", "FORMALSHOES", "SLIDERS", "SPORTSSHOES"],
    WOMEN: ["CASUAL", "SLIDERS", "SPORTSSHOES"],
    KIDS: [],
  };

  const subcategoryLabels = {
    BOOTS: "Boots",
    CASUAL: "Casual",
    FORMALSHOES: "Formal Shoes",
    SLIDERS: "Sliders/Flip Flops",
    SPORTSSHOES: "Sports Shoes",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category,
      subCategory: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      alert("Please enter a valid positive number for Quantity.");
      return;
    }
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      alert("Please enter a valid positive number for Price.");
      return;
    }
    if (!formData.category) {
      alert("Please select a Category.");
      return;
    }
    if (subcategories[formData.category]?.length && !formData.subCategory) {
      alert("Please select a subCategory.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      color: formData.color.trim(),
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      category: formData.category,
      subCategory: formData.subCategory || null,
      description: formData.description.trim(),
      img1: formData.img1.trim(),
      img2: formData.img2.trim(),
      img3: formData.img3.trim(),
      img4: formData.img4.trim(),
      img5: formData.img5.trim(),
    };

    try {
      //api to create product
      const response = await fetch(`${baseUrl}/products/createProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        alert(`Failed to submit product: ${response.status} ${response.statusText}`);
        console.error("Server error:", text);
        return;
      }

      const result = await response.json();
      alert("Product added successfully!", result);
      setFormData({
        name: "",
        color: "",
        quantity: "",
        price: "",
        category: "",
        subCategory: "",
        description: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting product, see console for details.");
    }
  };

  return (
    <div className="container mt-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="row justify-content-center align-items-center"
      >
        {/* Lottie Animation */}
        <div className="col-md-4 mb-4">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ height: 350, width: 350, margin: "0 auto" }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-7">
          <motion.div
            className="card shadow p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-center text-danger mb-4">Add New Product</h3>

            <form onSubmit={handleSubmit} className="bg-light p-3 rounded">
              {[ // 1. Product Name, Color, Quantity, Price
                { label: "Product Name", name: "name", type: "text" },
                { label: "Color", name: "color", type: "text" },
                { label: "Quantity", name: "quantity", type: "number" },
                { label: "Price (₹)", name: "price", type: "number" },
              ].map(({ label, name, type }, idx) => (
                <motion.div
                  className="mb-3"
                  key={name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * idx }}
                >
                  <label htmlFor={name} className="form-label">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </motion.div>
              ))}

              {/* Category Select */}
              <motion.div
                className="mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  {Object.keys(subcategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* subCategory Select */}
              {formData.category && subcategories[formData.category]?.length > 0 && (
                <motion.div
                  className="mb-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <label htmlFor="subCategory" className="form-label">
                    Sub Category
                  </label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Sub Category</option>
                    {subcategories[formData.category].map((sub) => (
                      <option key={sub} value={sub}>
                        {subcategoryLabels[sub]}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Description */}
              <motion.div
                className="mb-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="form-control"
                  required
                />
              </motion.div>

              {/* Image URLs */}
              {[
                { label: "Image URL 1", name: "img1", type: "text" },
                { label: "Image URL 2", name: "img2", type: "text" },
                { label: "Image URL 3", name: "img3", type: "text" },
                { label: "Image URL 4", name: "img4", type: "text" },
                { label: "Image URL 5", name: "img5", type: "text" },
              ].map(({ label, name, type }, idx) => (
                <motion.div
                  className="mb-3"
                  key={name}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2.6 + 0.2 * idx }}
                >
                  <label htmlFor={name} className="form-label">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </motion.div>
              ))}

              <button type="submit" className="btn btn-danger w-100" style={{ marginTop: 15 }}>
                Submit
              </button>
            </form>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProductForm;
