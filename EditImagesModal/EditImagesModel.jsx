import React, { useState, useEffect } from "react";

const EditImagesModal = ({ product, onClose, onSave }) => {
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });

  useEffect(() => {
    if (product) {
      setImages({
        img1: product.img1 || "",
        img2: product.img2 || "",
        img3: product.img3 || "",
        img4: product.img4 || "",
        img5: product.img5 || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImages((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(images);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Images for Model No: {product.modelNo}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {[1, 2, 3, 4, 5].map((num) => (
              <div className="mb-3" key={num}>
                <label className="form-label">Image {num} URL</label>
                <input
                  type="text"
                  className="form-control"
                  name={`img${num}`}
                  value={images[`img${num}`]}
                  onChange={handleChange}
                  placeholder={`Enter Image ${num} URL`}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImagesModal;
