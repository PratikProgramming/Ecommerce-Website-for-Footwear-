import React, { useEffect, useState } from 'react';
import {
  getAllCartItems,
  removeItemFromCart,
  clearCart,
} from '../baseUrl/CartAPI'; // adjust path

const userId = 1; // Replace with real user ID (e.g., from auth)

function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await getAllCartItems(userId);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    await removeItemFromCart(userId, itemId);
    fetchItems();
  };

  const handleClear = async () => {
    await clearCart(userId);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (items.length === 0) return <div className="container mt-5 text-center">Your cart is empty.</div>;

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <ul className="list-group mb-3">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.product.name}</h5>
              <p className="mb-0">₹{item.product.price} x {item.quantity}</p>
            </div>
            <img src={item.product.img1} alt={item.product.name} style={{ width: '80px' }} />
            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4>Total: ₹{total}</h4>
      <button className="btn btn-warning" onClick={handleClear}>Clear Cart</button>
    </div>
  );
}

export default CartPage;
