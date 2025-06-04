import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../../components/CartContext';

function ProductDetailPage() {
  const { modelNo } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { incrementCart } = useCart();
  const userId = 1; // TODO: Replace with actual logged-in user logic

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/model/${modelNo}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.img1);
      })
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [modelNo]);

  const handleAddToCart = async () => {
    const item = {
      modelNo: product.modelNo,
      quantity: 1,
    };
    try {
      await axios.post(`http://localhost:8080/api/cart/${userId}/items`, item);
      incrementCart();
      alert('Added to cart!');
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row g-5">

        {/* Left: Product Images */}
        <div className="col-md-6">
          <div className="border rounded shadow-sm p-3">
            <img src={mainImage} alt="Main" className="img-fluid rounded mb-3" />
            <div className="d-flex flex-wrap gap-2">
              {[product.img1, product.img2, product.img3, product.img4, product.img5]
                .filter(Boolean)
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`View ${i}`}
                    className="img-thumbnail"
                    style={{ width: '75px', height: '75px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setMainImage(img)}
                  />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="col-md-6">
          <div className="border rounded shadow-sm p-4 bg-white">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted mb-1"><strong>Brand:</strong> {product.brand}</p>
            <p className="text-muted mb-1"><strong>Color:</strong> {product.color}</p>
            <h4 className="text-danger mt-3 mb-2">
              ₹{product.price}{' '}
              <small className="text-muted text-decoration-line-through"></small>
            </h4>
            
            <p className="text-secondary mb-4">{product.description}</p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <button className="btn btn-danger px-4">Buy It Now</button>
              <button className="btn btn-outline-dark px-4" onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <input
                type="text"
                className="form-control w-50"
                placeholder="Enter PIN code"
              />
              <button className="btn btn-dark">Check</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
