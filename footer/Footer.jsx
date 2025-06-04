import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  const [showContact, setShowContact] = useState(false);

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  return (
    <div>
      <footer className="bg-light text-dark pt-5 pb-3 mt-5">
        <div className="container">
          <div className="row">

            {/* Shop */}
            <div className="col-md-3">
              <h5 className="fw-bold">Shop</h5>
              <ul className="list-unstyled">
                <li>Men</li>
                <li>Women</li>
                <li>Kids</li>
                <li>Accessories</li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-md-2">
              <h5 className="fw-bold">Help</h5>
              <ul className="list-unstyled">
                <li>About Us</li>
                <li>Contact Us</li>
                <li>My Account</li>
                <li>Store Locator</li>
                <li>Store Expansion</li>
                <li>FAQs</li>
              </ul>
            </div>

            {/* Read More + Contact Info */}
            <div className="col-md-6 text-center">
              <p>
                Sign up now and be the first to know about exclusive offers,<br/>
                latest fashion news & style tips!
              </p>
              <button
                onClick={toggleContact}
                className="border-0 bg-transparent fw-bold text-dark text-decoration-underline"
                style={{ cursor: 'pointer' }}
              >
                {showContact ? 'Read More' : 'Read More'}
              </button>

              {showContact && (
                <div className="mt-4 border-top pt-3">
                  <h4>CONTACT US</h4>
                  <p>
                    You can reach out to us via email at{' '}
                    <a href="mailto:customercare@redtapeindia.com">
                      customercare@redtapeindia.com
                    </a>. Our customer care team is also available at{' '}
                    <a href="tel:‪+917796766161‬">‪+91 7796766161‬</a> (Weekdays 09:30 A.M. to 05:00 P.M.).
                  </p>
                  <p>
                    We are committed to providing you with the best possible support and ensuring your
                    experience with RedTape is nothing short of excellent.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    <footer className="text-center py-4 mt-5 border-top">
      
      <div className="mb-3">
        <FaFacebookF className="mx-2" size={20} />
        <FaXTwitter className="mx-2" size={20} />
        <FaYoutube className="mx-2" size={20} />
        <FaInstagram className="mx-2" size={20} />
      </div>

      
      <div className="mb-2 text-secondary">
        <a href="#return" className="text-decoration-none text-dark mx-2">Return</a>|
        <a href="#terms" className="text-decoration-none text-dark mx-2">Term and Conditions</a>|
        <a href="#privacy" className="text-decoration-none text-dark mx-2">Privacy Policy</a>
      </div>

     
      <p className="mb-1 text-dark">
        The content of this site is copyright-protected and is the property of <strong>RedTape</strong>
      </p>

      
      <img
        src="https://redtapeproduction.myshopify.com/cdn/shop/files/logo.png?v=1709199708&width=180"
        alt="RedTape Logo"
        style={{ width: '80px', marginTop: '10px' }}
      />
    </footer>
    </div>

  );
};

export default Footer;