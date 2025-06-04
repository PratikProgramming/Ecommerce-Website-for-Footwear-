import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./AdminHome.css";

const cards = [
  {
    title: "All Products",
    link: "/admin/products",
    description: "Manage and view all available products.",
    image: "https://cdn-icons-png.flaticon.com/512/869/869636.png"
  },
  {
    title: "Add Product",
    link: "/admin/add-product",
    description: "Add new RedTape shoes to your collection.",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
  },
  {
    title: "Orders",
    link: "/admin/orders",
    description: "Track and manage customer orders.",
    image: "https://cdn-icons-png.flaticon.com/512/891/891462.png"
  },
  {
    title: "Customers",
    link: "/admin/users",
    description: "View and manage user accounts.",
    image: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
  },
  {
    title: "Reviews",
    link: "/admin/reviews",
    description: "Check customer reviews and feedback.",
    image: "https://cdn-icons-png.flaticon.com/512/929/929564.png"
  },
  {
    title: "Analytics",
    link: "/admin/analytics",
    description: "View dashboard insights and sales performance.",
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828942.png"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const AdminHome = () => {
  return (
    <motion.div
      className="admin-dashboard container py-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-5">
  <motion.img
    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    alt="Admin Avatar"
    className="mb-3 rounded-circle shadow"
    style={{ width: "100px" }}
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, damping: 10 }}
  />

  <motion.h1
    className="fw-bold text-uppercase text-gradient"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    Welcome Admin
  </motion.h1>

  <motion.p
    className="text-muted"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    Manage your RedTape Empire
  </motion.p>
</motion.div>


      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <Link to={card.link} className="text-decoration-none">
              <motion.div
                className="admin-card p-4 rounded text-center h-100"
                variants={cardVariants}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="mb-3 admin-icon"
                  style={{ width: "50px" }}
                />
                <h5 className="fw-bold text-dark mb-2">{card.title}</h5>
                <p className="text-muted small">{card.description}</p>
              </motion.div>
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminHome;
