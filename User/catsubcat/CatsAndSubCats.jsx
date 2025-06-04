import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../ProductCard/ProductCard'; // Adjust path if needed
import SidebarFilters from '../../ProductCard/Sidebar';  // Adjust path if needed
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

function CatsAndSubCats() {
  const { cat, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState({ products: [] }); // Assuming cart has a 'products' array
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/catAndSubCat/${cat}/${subcategory}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [cat, subcategory]);

  // Add product to cart and sync with backend
  const handleAddToCart = async (product) => {
    try {
      // Prepare updated products array
      const updatedProducts = [...cart.products, product];

      // Create updated cart object — adjust shape as per your backend Cart model
      const updatedCart = { ...cart, products: updatedProducts };

      // Call backend API
      const response = await axios.post(
        'http://localhost:8080/api/cart/createOrUpdateCart',
        updatedCart
      );

      // Update local cart state with server response (fallback to updatedProducts)
      setCart(response.data || updatedCart);

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <SidebarFilters />
        </div>

        {/* Product Grid */}
        <div className="col-md-9">
          <h3 className="text-center fw-bold text-uppercase mb-4">
            {cat} / {subcategory}
          </h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard
                    product={product}
                    onViewDetails={() => navigate(`/products/${product.modelNo}`)}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center py-5">
                <p>No products found for this category and subcategory.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-xl relative">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.img1}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <p className="mb-2"><strong>Description:</strong> {selectedProduct.description}</p>
            <p className="mb-4"><strong>Price:</strong> ₹ {selectedProduct.price}</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-xl"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatsAndSubCats;
