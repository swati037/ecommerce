import React from 'react';
import img from '../assests/image_pic.png';
import '../assests/styles/components/AboutUsPic.css'; 

const ImageAboutUs = () => {
  return (
    <div className="about-us-pic-container">
      <img
        src={img}
        alt="Description"
        className="about-us-pic-img"
      />
      <div className="about-us-pic-overlay">
        <h2 className="about-us-pic-heading">About Us</h2>
        <p className="about-us-pic-paragraph">Discover the Essence Behind Our Bottled Artistry – Unveiling the Story in Every Sip</p>
      </div>
    </div>
  );
};

export default ImageAboutUs;
