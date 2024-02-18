import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../components/Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../assests/styles/components/bestSellingProduct.css';

import {
  useGetUsersQuery,
} from '../slices/usersApiSlice';

import {
  useGetProductsQuery,
} from '../slices/productsApiSlice';

const Card = ({ title, description, price, imgUrl, rating, reviews, discountPercentage }) => (
  <div className="container100">
    <div className="image-container-style image-container ">
      <img
        src={imgUrl}
        alt={title}
        style={{ maxWidth: '100%', height: '200px', width: '60%', marginBottom: '10px', margin: 'auto', marginTop: '20px' }}
      />
      
      {discountPercentage > 0 && (
        <div className="discount-badge">
          {discountPercentage}%
        </div>
      )}
    </div>

    <div className="product-details" style={{ textAlign: 'left', paddingLeft: '15px', paddingTop: '30px' }}>
      <div className="product-rating">
        <Rating value={rating} text={`${reviews.length} reviews`} />
      </div>

      <div style={{ alignSelf: 'stretch' }}>
        <p className="link-paragraph"
          onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
          onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}>
          <Link to={`/product`}>
            {title}
          </Link>
        </p>
      </div>

      <span className="custom-span">
        Rs {price - ((discountPercentage / 100) * price)}
        {discountPercentage > 0 && (
          <span className="price-span">
            Rs {price}
          </span>
        )}
      </span>
    </div>
  </div>
);



const BestSellingCarousel = () => {
  const { pageNumber } = useParams();
  const { data } = useGetProductsQuery({ pageNumber });
  const recentProducts = data
    ? data.products
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
    : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.8, 
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 769, 
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '600px', background: 'black' }}>
      <div style={{ width: '50%', marginLeft: '10px' }}>
        <h2 className="best-seller-heading">
          Best Seller Product
        </h2>
        <p className="hydration-paragraph">
          Meet your hydration sidekick.
        </p>
        <div className="styled-div">
          <LinkContainer to='/product'>
            <Nav.Link>
              See More
            </Nav.Link>
          </LinkContainer>
        </div>
      </div>
      <Slider {...settings} style={{ width: '60%', height: ' 70%' }}>
        {recentProducts.map((product, index) => (
          <div key={index}>
            <Card
              title={product.name}
              description={product.description}
              price={product.price}
              imgUrl={product.image}
              rating={product.rating}
              reviews={product.reviews}
              discountPercentage={product.discountPercentage}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default BestSellingCarousel;
