import React, { useEffect } from "react";
import "aos/dist/aos.css";
import ImageCarousel from "../Carousel Component/ImageCarousel";
import Footer from "../footer/Footer";
import Aos from "aos";

const Home = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <ImageCarousel />

      <div className="my-4 text-center" data-aos="fade-up">
        <img
          src="https://redtape.com/cdn/shop/files/1600x300-angie_capphoto.webp?v=1741691698"
          alt="RedTape Banner"
          className="img-fluid"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* Full-Screen Video Section */}
      <div style={{ width: "100%", height: "100vh", overflow: "hidden" }} data-aos="fade-up">
        <video
          src="https://redtape.com/cdn/shop/videos/c/vp/d5b580a23aba4dcdaa82f0865b2bcd8c/d5b580a23aba4dcdaa82f0865b2bcd8c.SD-480p-1.5Mbps-43970481.mp4?v=0"
          autoPlay
          muted
          loop
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Side-by-side full-height images */}
      <div style={{ width: "100%", display: "flex", flexWrap: "revert" }}>
        <div style={{ height: "120vh", overflow: "hidden" }} data-aos="fade-right">
          <img
            src="https://redtape.com/cdn/shop/files/1000x900-1_08f1e2ae-9972-4736-aece-62bf8e3159ba.webp?v=1741691932"
            alt="Performance"
            style={{ width: "auto", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ height: "120vh", overflow: "hidden" }} data-aos="fade-left">
          <img
            src="https://redtape.com/cdn/shop/files/600x900-1.webp?v=1741691935"
            alt="Casual Sway"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* After the side-by-side image section */}
      <div className="my-4 text-center" data-aos="fade-up">
        <img
          src="https://redtape.com/cdn/shop/files/1600x300-angie_capphoto_0b03f481-b866-420f-8c71-cce65abfee43.webp?v=1741692046"
          alt="RedTape Wardrobe"
          className="img-fluid"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* Up-and-Coming Section */}
      <div className="container-fluid my-5 px-3">
        <h3 className="fw-bold mb-4" data-aos="fade-up">UP-AND-COMING</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {[
            {
              src: "https://redtape.com/cdn/shop/files/RSL0532A_1.jpg?v=1748332527&width=360",
              alt: "Casual Sneaker Shoes for Men",
              title: "Casual Sneaker Shoes for Men",
              price: "₹1,071.00",
              old: "₹6,299.00",
            },
            {
              src: "https://redtape.com/cdn/shop/files/RSL1163A_1..jpg?v=1748330806&width=360",
              alt: "Lifestyle Casual Shoes for Men",
              title: "Lifestyle Casual Shoes for Men",
              price: "₹1,139.00",
              old: "₹6,699.00",
            },
            {
              src: "https://redtape.com/cdn/shop/files/RLO1752A_1_18079544-0540-4d6a-abd6-75be34542ffd.jpg?v=1748331262&width=360",
              alt: "Athleisure Shoes for Women",
              title: "Athleisure Shoes for Women",
              price: "₹1,496.00",
              old: "₹8,799.00",
            },
            {
              src: "https://redtape.com/cdn/shop/files/RLO1755A_1_45f8aecc-78a8-4001-aae4-26ce387a4e1f.jpg?v=1748331266&width=360",
              alt: "Athleisure Shoes for Women",
              title: "Athleisure Shoes for Women",
              price: "₹1,496.00",
              old: "₹8,799.00",
            },
            {
              src: "https://redtape.com/cdn/shop/files/RLO1806A_1.jpg?v=1748331270&width=360",
              alt: "Athleisure Shoes for Women",
              title: "Athleisure Shoes for Women",
              price: "₹1,615.00",
              old: "₹9,499.00",
            }
          ].map((product, i) => (
            <div className="col text-center" key={i} data-aos="zoom-in">
              <img src={product.src} alt={product.alt} className="img-fluid" />
              <p className="mt-2 mb-0">{product.title}</p>
              <p className="text-danger fw-bold mb-0">
                {product.price}{" "}
                <span className="text-decoration-line-through text-muted fw-normal">
                  {product.old}
                </span>{" "}
                <span className="text-danger">(83% OFF)</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Banner Section */}
      <div className="container-fluid px-0 pt-5" data-aos="fade-up">
        <img
          src="https://redtape.com/cdn/shop/files/CAMPAIGN.WERONIKA.SLEEP.-1600X700-2.webp?v=1741692811"
          alt="Campaign Banner"
          className="img-fluid w-100"
        />
      </div>

      {/* Perfume Banner Section */}
      <div className="container-fluid pt-3 px-0" data-aos="fade-up">
        <img
          src="https://redtape.com/cdn/shop/files/1600x300-perfume.webp?v=1741693106"
          alt="Perfume Banner"
          className="img-fluid w-100"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
