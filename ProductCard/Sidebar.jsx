import React from 'react';

const SidebarFilters = () => {
  return (
    <div className="p-3 border">
      <h5 className="fw-bold mb-3">CATEGORIES</h5>
      <ul className="list-unstyled">
        <li><a href="#">Boots</a></li>
        <li><a href="#">Casual</a></li>
        <li><a href="#">Formal Shoes</a></li>
        <li><a href="#">Sandals/Slippers</a></li>
        <li><a href="#">Slider/Flip Flops</a></li>
        <li><a href="#">Sports Shoes</a></li>
      </ul>

      <h5 className="fw-bold mt-4 mb-3">PRICE</h5>
      <p>The highest price is ₹2,510.00</p>
      <div className="d-flex gap-2 mb-3">
        <input type="number" className="form-control" placeholder="From" />
        <input type="number" className="form-control" placeholder="To" />
      </div>

      <h5 className="fw-bold mt-4 mb-3">SIZE FILTER</h5>
      <div>
        {[6, 7, 8, 9, 10].map((size) => (
          <div key={size} className="form-check">
            <input className="form-check-input" type="checkbox" id={`size-${size}`} />
            <label className="form-check-label" htmlFor={`size-${size}`}>
              {size}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarFilters;
