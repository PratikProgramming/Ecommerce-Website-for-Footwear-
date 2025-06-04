import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl/baseUrl";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // Helper to build full image URL if relative path is given
  const getFullImageUrl = (img) => {
    if (!img) return null;
    return img.startsWith("http") ? img : `${baseUrl}/${img}`;
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/products/getAllProducts`);
      console.log("Products fetched:", res.data); // Debug log
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to fetch products.");
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter products with at least one valid image
  const productsWithImages = products.filter((p) =>
    [p.img1, p.img2, p.img3, p.img4, p.img5].some((img) => img && img.trim())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Products with Images</h2>

      {productsWithImages.length === 0 ? (
        <p className="text-center">No products with images found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productsWithImages.map((product) => (
            <div className="col" key={product.modelNo || product.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text mb-2">
                    Model No: {product.modelNo || "N/A"}
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {[product.img1, product.img2, product.img3, product.img4, product.img5]
                      .filter((img) => img && img.trim())
                      .map((img, idx) => (
                        <img
                          key={idx}
                          src={getFullImageUrl(img)}
                          alt={`${product.name} ${idx + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
