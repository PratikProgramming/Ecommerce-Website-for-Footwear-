import React, { useState } from "react";
import { FaSearch, FaShoppingBag, FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from '../NavBar/CategoryNavbar.module.css';
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext"; // Adjust the path based on your structure

const MainNavNavbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { cartCount } = useCart(); // 🔥 Get cart count from context

  const renderMenu = (category) => {
    switch (category) {
      case "Men":
        return (
          <>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>FOOT WEAR</div>
              <ul className="list-unstyled text-decoration-none text-dark">
                <li><Link to="/cat/MEN/BOOTS" className="list-unstyled text-decoration-none text-dark">Boots</Link></li>
                <li><Link to="/mens-footwear/CASUAL" className="list-unstyled text-decoration-none text-dark">Casual</Link></li>
                <li><Link to="/mens-footwear/FORMALSHOES" className="list-unstyled text-decoration-none text-dark">Formal Shoes</Link></li>
                <li><Link to="/mens-footwear/SLIDERS" className="list-unstyled text-decoration-none text-dark">Sliders</Link></li>
                <li><Link to="/mens-footwear/SPORTSSHOES" className="list-unstyled text-decoration-none text-dark">Sports Shoes</Link></li>
              </ul>
            </div>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>TOP WEAR</div>
              <ul className="list-unstyled">
                <li>Nehru Jacket</li>
                <li>Jackets</li>
                <li>Shirts</li>
                <li>Sweater</li>
                <li>Hoodies</li>
                <li>T-shirts</li>
              </ul>
            </div>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>BOTTOM WEAR</div>
              <ul className="list-unstyled">
                <li>Jeans</li>
                <li>Trouser</li>
                <li>Shorts</li>
              </ul>
            </div>
          </>
        );
      case "Women":
        return (
          <>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>FOOT WEAR</div>
              <ul className="list-unstyled">
                <li>Casual Shoes</li>
                <li>Sliders/Flip Flops</li>
                <li>Sports Shoes</li>
              </ul>
            </div>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>TOP WEAR</div>
              <ul className="list-unstyled">
                <li>Jackets</li>
                <li>Shirt</li>
                <li>Sweatshirt/Hoodies</li>
                <li>T-Shirt</li>
              </ul>
            </div>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>BOTTOM WEAR</div>
              <ul className="list-unstyled">
                <li>Jeans/Jegging</li>
                <li>Trouser/Pant</li>
              </ul>
            </div>
          </>
        );
      case "Kids":
        return (
          <>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>BOYS</div>
              <ul className="list-unstyled">
                <li>T-Shirts</li>
              </ul>
            </div>
            <div className={styles.menuCol}>
              <div className={styles.menuTitle}>GIRLS</div>
              <ul className="list-unstyled">
                <li>T-Shirts</li>
                <li>Trackpant/Joggers</li>
              </ul>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className={`navbar navbar-expand ${styles.navbar}`}>
      <div className="container-fluid justify-content-between">

        {/* Logo */}
        <a className="navbar-brand mx-auto d-flex align-items-left" href="/">
          <img
            src="https://redtape.com/cdn/shop/files/logo.png?v=1704870276&width=270"
            alt="RedTape Logo"
            height="30"
          />
        </a>

        {/* Category Navigation */}
        <div className="d-flex justify-content-center w-100 gap-5">
          {["Men", "Women", "Kids"].map((category) => (
            <div
              key={category}
              className={styles.navItem}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <span className="text-dark d-flex align-items-center gap-1">
                {category}
                {hoveredCategory === category ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </span>

              {hoveredCategory === category && (
                <div className={styles.megaMenu}>
                  <div className="d-flex gap-5 flex-wrap">
                    {renderMenu(category)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="d-flex align-items-center gap-4">
          <FaSearch size={20} className="cursor-pointer" />

          <div className="position-relative">
            <FaShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </div>
          <Link to="/contactUs" className="nav-link text-dark">
            Contact Us
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default MainNavNavbar;
