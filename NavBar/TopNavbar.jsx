import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import baseUrl from "../baseUrl/baseUrl";

const TopNavbar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (email) {
      // Fetch username
      fetch(`${baseUrl}/users/username?email=${encodeURIComponent(email)}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.text();
        })
        .then((usernameFromApi) => setUsername(usernameFromApi))
        .catch((error) => {
          console.error("Error fetching username:", error);
          setUsername(null);
        });

      // Fetch role
      fetch(`${baseUrl}/users/role?email=${encodeURIComponent(email)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Role not found");
          return res.text();
        })
        .then((roleFromApi) => {
          const normalizedRole = roleFromApi.toUpperCase(); // 🔥 Normalize role
          localStorage.setItem("role", normalizedRole);
          setRole(normalizedRole);
          console.log("Role fetched and set:", normalizedRole); // ✅ Debug
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setRole(null);
        });
    } else {
      setUsername(null);
      setRole(null);
    }
  }, [email]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUsername(null);
    setRole(null);
    navigate("/login", { replace: true });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
   console.log("Redirecting based on role:", role); // ✅ Debug
if (role && role.toUpperCase() === "ADMIN") {
  navigate("/adminHome");
} else {
  navigate("/home");
}

  };

  return (
    <div className="border-bottom shadow-sm bg-white">
      <nav className="container-fluid d-flex justify-content-between align-items-center py-2 px-4">

        {/* Logo Center */}
        <div className="text-center flex-grow-1">
          <a
            href="/"
            onClick={handleLogoClick}
            className="navbar-brand d-inline-block"
          >
            <img
              src="https://redtape.com/cdn/shop/files/logo.png?v=1704870276&width=270"
              alt="RedTape Logo"
              height="40"
            />
          </a>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-4 position-relative">
          {username ? (
            <>
              <span className="text-dark">Hi, {username}</span>
              <button
                className="btn btn-link text-decoration-none text-danger p-0"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-outline-danger dropdown-toggle"
                type="button"
                id="loginSignupDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="loginSignupDropdown"
              >
                <li>
                  <Link className="dropdown-item btn btn-outline-dark" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item btn btn-outline-dark" to="/signup">
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
