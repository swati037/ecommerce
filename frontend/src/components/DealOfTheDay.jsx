import React from 'react';
import { Nav } from 'react-bootstrap';
import '../assests/styles/components/DealOfTheDay.css'

const DealOfTheDay = () => {
  return (
      <div className="deal-of-day">
        <h1 className="heading">Deal of The Day</h1>
        <p className="paragraph">Elevate your hydration game with our eco-friendly water bottles.</p>
        <p className="paragraph">Sip sustainably, stay stylish.</p>
  
        <div className="squares-container">
          <div className="square">
            <div className="square-content">10</div>
            <div className="text">Days</div>
          </div>
          <div className="square">
            <div className="square-content">05</div>
            <div className="text">Hours</div>
          </div>
          <div className="square">
            <div className="square-content">47</div>
            <div className="text">Minutes</div>
          </div>
        </div>
  
        <div className="shop-now">
          <Nav.Link>Shop Now</Nav.Link>
        </div>
      </div>
    );
  };

export default DealOfTheDay;
