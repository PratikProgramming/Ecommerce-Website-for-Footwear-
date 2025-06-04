import React from "react";

const ContactUs = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src="https://redtape.com/cdn/shop/files/MicrosoftTeams-image_3.jpg?v=1707894680&width=2000"
        alt="Contact Background"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />

      {/* Overlay content */}
      <div className="flex flex-col items-center justify-center h-full text-white text-center px-4 bg-black bg-opacity-60">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-6">CONTACT US</h1>

        <p className="text-lg md:text-xl mb-2">
          You can reach out to us via email at
          <a
            href="mailto:customercare@redtapeindia.com"
            className="text-blue-300 underline ml-2"
          >
            customercare@redtapeindia.com
          </a>
          .
        </p>

        <p className="text-lg md:text-xl mb-2">
          Our dedicated customer care team is also available to assist you at
          <a
            href="tel:+917836850000"
            className="text-blue-300 underline ml-2"
          >
            +91 7836850000
          </a>
          (Weekdays 09:30 A.M. to 05:00 P.M.).
        </p>

        <p className="text-lg md:text-xl max-w-3xl mt-4">
          We are committed to providing you with the best possible support and ensuring your experience with RedTape is nothing short of excellent.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
