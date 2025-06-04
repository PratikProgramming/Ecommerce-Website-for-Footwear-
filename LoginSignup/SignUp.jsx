import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from "../baseUrl/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from '../footer/Footer';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (/\d/.test(value)) {
        setErrors(prev => ({ ...prev, name: "Numbers not allowed" }));
      } else {
        setErrors(prev => ({ ...prev, name: "" }));
      }
      const filteredValue = value.replace(/[^A-Za-z\s]/g, '');
      setFormData({ ...formData, [name]: filteredValue });

    } else if (name === "mobile") {
      const filteredValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: filteredValue });
      setErrors(prev => ({ ...prev, mobile: "" }));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g., name@example.com)";
    }
    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      password: formData.password,
      gender: formData.gender,
    };

    try {
      await axios.post(`${baseUrl}/users/createUser`, payload);
      Swal.fire({
        title: "Success",
        text: "Registered Successfully! Redirecting to login...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        heightAuto: false,
      });
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          gender: '',
        });
        setIsSubmitting(false);
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md- col-lg-7">
          <div className="card shadow p-4">
            <div className="text-center mb-4">
              <img src="RedTapeLogo.png" alt="Logo" className="img-fluid" style={{ width: '200px', height: '50px' }} />
            </div>
            <h2 className="text-center font-monospace mb-3">Register Your Account</h2>
            <p className="text-center text-muted">
              If you already have an account
              <button className="btn btn-sm btn-danger text-decoration-none fw-bold text-white ms-2">
                <Link className="nav-link" to="/login">Login</Link>
              </button>
            </p>

            <h5 className="mb-3">Your Personal Details</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={15}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={25}
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="mobile"
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
              </div>

              <div className="mb-3">
                <select
                  name="gender"
                  className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <div className="form-check mb-3 text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="privacyPolicy"
                  required
                />
                <label className="form-check-label" htmlFor="privacyPolicy">
                  <strong>Privacy Policy</strong> I have read and agree to the
                </label>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
