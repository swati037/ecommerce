import React from 'react';
import img from '../assests/image_pic.png';
import '../assests/styles/components/AboutUsPic.css'; 

const ImageProduct = () => {
  return (
    <div className="about-us-pic-container">
      <img
        src={img}
        alt="Description"
        className="about-us-pic-img"
      />
      <div className="about-us-pic-overlay">
        <h2 className="about-us-pic-heading">Shop Products</h2>
        <p className="about-us-pic-paragraph">Dive into a world of quality, sustainability, and innovation – your perfect sip awaits!</p>
      </div>
    </div>
  );
};

export default ImageProduct;

