import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import dealImg from '../assests/image_pic1.png';
import '../assests/styles/components/LandingProductFirst.css';

const LandingProduct = () => {
  return (
    <div className="about-us-pic-container">
      <img src={dealImg} alt="Description" className="about-us-pic-img" />
      <div className="about-us-pic-overlay1">
        <h1 className="h1-landing-product">100% PURITY </h1>
        <h1 className="h1-landing-certified-product">CERTIFIED PRODUCTS</h1>
        <p className="para-landing-style">
          Quench your thirst for style and hydration.
        </p>
        <div>
          <LinkContainer to='/product' className="link-container-landing">
            <Nav.Link>Shop Now</Nav.Link>
          </LinkContainer>
        </div>
      </div>
    </div>
  );
};

export default LandingProduct;
