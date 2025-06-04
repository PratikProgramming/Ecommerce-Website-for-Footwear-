import { useCart } from "../components/CartContext";

function ProductCard({ product, onViewDetails, onAddToCart }) {
  const { addToCart } = useCart();
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.img1}
        className="card-img-top"
        alt={product.name}
        style={{ height: '350px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <p className="text-success fw-bold">₹ {product.price}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={onViewDetails}>
            View Details
          </button>
          <button onClick={() => addToCart(product)} className="btn btn-outline-secondary">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;