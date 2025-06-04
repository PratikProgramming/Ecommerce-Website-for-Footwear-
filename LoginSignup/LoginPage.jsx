import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseUrl from '../baseUrl/baseUrl';
import Footer from '../footer/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    const userRole = localStorage.getItem('role');

    if (userEmail) {
      // User is already logged in, redirect based on role
      if (userRole?.toUpperCase() === 'ADMIN') {
        navigate('/adminHome', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    }
  }, [navigate]);

  const showToast = (icon, message) => {
    Swal.fire({
      icon: icon,
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'small-swal',
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      email,
      password,
    };

    try {
      const res = await axios.post(`${baseUrl}/users/login`, formData);
      if (res.status === 200) {
        showToast('success', 'Logged in successfully!');
        localStorage.setItem('email', res.data.email);
        console.log(res.data.role);
        
        setTimeout(() => {
          if (res.data.role === 'ADMIN') {
            navigate('/adminHome', { replace: true });
          } else {
            navigate('/home', { replace: true });
          }
        }, 2000);
      } else {
        showToast('error', 'Login failed: unexpected response');
      }
    } catch (err) {
      showToast('error', 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row shadow-lg rounded-4 overflow-hidden w-100" style={{ maxWidth: '1000px' }}>
          {/* Left Side */}
          <div className="col-md-6 d-flex bg-white flex-column justify-content-center align-items-center text-white p-5 position-relative">
            <img src={'https://redtape.com/cdn/shop/files/1.png?v=1741350299'} alt="RedTape Shoe" className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
            <p className="text-center fw-bold text-black mb-4">
              Don’t have an account? <br /> Register now and join the RedTape community.
            </p>
            <button className="btn btn-danger">
              <Link className="text-decoration-none fw-bold text-white" to="/signup">Sign Up</Link>
            </button>
          </div>

          {/* Right Side */}
          <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <img src={'RedTapeLogo.png'} alt="RedTape Logo" style={{ maxWidth: '120px' }} />
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="floatingEmail">Email</label>
              </div>

              <div className="form-floating mb-2">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="text-decoration-none text-danger small">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn btn-danger w-100 mb-3" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
              </button>

              <div className="text-center">
                <p className="small mb-2">Or Login With</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn px-3 d-flex align-items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" style={{ width: '30px', height: '30px' }} />
                  </button>
                  <button type="button" className="btn px-3 d-flex align-items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" style={{ width: '30px', height: '30px' }} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />

      {/* SweetAlert Custom Styling */}
      <style>{`
        .swal2-popup.small-swal {
          font-size: 0.9rem !important;
          padding: 1rem 1.5rem !important;
          width: auto !important;
        }
      `}</style>
    </>
  );
}
