import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Row, Col } from 'react-bootstrap';
import '../assests/styles/components/OurLandingProduct.css'

const OurLandingProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (data && data.products) {
          setProducts(data.products);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductData();
  }, []);


  return (
    <div>
      <h1 className="product-header">Our Product</h1>
      <p className="shop-now-paragraph">
        Shop now for the perfect companion on your journey to a healthier, more hydrated you.
      </p>
      <Row>
        {products.slice(0, 8).map(product => (
          <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
            <div className="product-container shop-now-container">
              <div className="image-container" style={{
                position: 'relative',
                width: '110%',
                borderRadius: '0px',
                overflow: 'hidden',
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image product-image-landing"
                />
                {product.discountPercentage > 0 && (
                  <div className="discount-badge">
                    {product.discountPercentage}%
                  </div>
                )}
              </div>
              <div className="product-rating">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
              <div style={{ alignSelf: 'stretch' }}>
                <p className="paragraph-landing-style"
                  onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
                  onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}>
                  <Link to={`/product/${product._id}`}>
                    {product.name}
                  </Link>
                </p>
              </div>
              <span className="price-style">
                Rs {product.price - ((product.discountPercentage / 100) * product.price)}
                {product.discountPercentage > 0 && (
                  <span className="strike-through-style">Rs {product.price}</span>
                )}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OurLandingProduct;
