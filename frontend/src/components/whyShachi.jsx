import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import buy from '../assests/bottle2.jpg';
import deliver from '../assests/pexels-ayrat-12354555.jpg';
import order from '../assests/pexels-karolina-grabowska-7283717.jpg';

const Card = ({ title, content, image, linkTo, linkDescription }) => {
  return (
    <div className="card mb-4" style={{
      maxWidth: '26rem',
      height: '27rem',
      margin: '10px',
      borderRadius: '15px',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s ease-in-out',
    }}
    >
      <div className="card-body">
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: '100%',
            height: '330px',
            width: '100%',
            marginBottom: '15px',
            margin: 'auto',
            display: 'block',
            borderRadius: '8px'
          }}
        />

        <div style={{
          display: 'flex',
          height: '45px',
          padding: '13px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          border: '1px solid var(--Color-Primary-Dark-Brown, #34251F)',
          backgroundColor: 'var(--blacking, #141108)', 
          color: 'white',
          fontFamily: 'Inter',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',
          letterSpacing: '0.7px',
          textTransform: 'uppercase',
         marginTop: '10px',
          width: '100%',
          borderRadius: '5px',
        }}>
          <LinkContainer to={linkTo}>
            <Nav.Link>
              {linkDescription}
            </Nav.Link>
          </LinkContainer>
        </div>

      </div>
      <style>
        {`
          .card:hover {
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1), 0px 5px 5px rgba(0, 0, 0, 0.08);
          }
        `}
      </style>
    </div>
  );
};

const ThreeCardComponent = () => {
  return (
    <div className="container">
      <h1 style={{
        color: 'var(--Color-Primary-Dark-Brown, #34251F)',
        textAlign: 'center',
        fontFamily: 'Frank Ruhl Libre',
        fontSize: '68px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        textTransform: 'capitalize',
      }}>why shachi ?</h1>

      <p style={{
        color: 'var(--Color-Primary-Dark-Brown, #34251F)',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '180%',
        textTransform: 'capitalize',
        paddingBottom: '20px',
        paddingTop: '5px'
      }}>Explore our collection of premium water bottles designed to keep you refreshed, wherever life takes you.</p>

      <div className="row">
        <div className="col-md-4">
          <Card title="Card 1" image={buy} linkTo="/" linkDescription="Choose Bottle" />
        </div>
        <div className="col-md-4">
          <Card title="Card 2" image={order} linkTo="/" linkDescription="Place an Order" />
        </div>
        <div className="col-md-4">
          <Card title="Card 3" image={deliver} linkTo="/" linkDescription="Get Bottle Delivered" />
        </div>
      </div>
    </div>
  );
};

export default ThreeCardComponent;
