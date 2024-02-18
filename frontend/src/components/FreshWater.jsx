import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assests/styles/components/FreshWater.css'; 
// import bottleImage from '../assests/Bottle.jpg';


const FreshWater = () => {
  return (
    <Container className="fresh-water-container">
      <Row>
        <Col sm={5} style={{ position: 'relative', marginTop: '15%', marginLeft: '5%' }}>
          <div>
            <div >
              
            </div>
          </div>
        </Col>
        <Col sm={5} style={{ position: 'relative', marginTop: '10%' }}>
          <div style={{ maxWidth: '100%', height: '500px', marginLeft: '10%', marginBottom: '30%' }}>
            <h1 className="heading-styles">Fresh Water in Our Store</h1>
            <p className="text-styles">Hydration, Elevated: Sip in Style with Our Premium Drinking Bottles!</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FreshWater;
