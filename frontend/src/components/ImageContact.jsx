import React from 'react';
import img from '../assests/image_pic.png';
import '../assests/styles/components/AboutUsPic.css'; 

const ImageContact = () => {
  return (
    <div className="about-us-pic-container">
      <img
        src={img}
        alt="Description"
        className="about-us-pic-img"
      />
      <div className="about-us-pic-overlay">
        <h2 className="about-us-pic-heading">Contact Us</h2>
        <p className="about-us-pic-paragraph">Got questions? We've got answers! Reach out and let's chat</p>
      </div>
    </div>
  );
};

export default ImageContact;
