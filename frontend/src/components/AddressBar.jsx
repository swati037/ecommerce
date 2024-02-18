import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaHouseChimney, FaPhone, FaEnvelope } from 'react-icons/fa6';
import '../assests/styles/components/AddressBar.css';  

function AddressBar() {
  return (
    <Container>
      <Row>
        <Col md={4} style={{ marginBottom: '20px' }}>
          <div className="container-style">
            <FaHouseChimney style={{ color: 'var(--PINK, #D994BC)', fontSize: '2em' }} />
            <span className="text-style">
              Address
            </span>
            <p className="text-style-2">
              Mumbai
            </p>
          </div>
        </Col>

        <Col md={4} style={{ marginBottom: '20px' }}>
          <div className="container-style">
            <FaPhone style={{ color: 'var(--PINK, #D994BC)', fontSize: '2em' }} />
            <span className="text-style">
              Contact Us
            </span>
            <p className="text-style-2">
              +84 234 567 890
            </p>
          </div>
        </Col>

        <Col md={4} style={{ marginBottom: '20px' }}>
          <div className="container-style">
            <FaEnvelope style={{ color: 'var(--PINK, #D994BC)', fontSize: '2em' }} />
            <span className="text-style">
              Email
            </span>
            <p className="text-style-2">
              shachi@gmail.com
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddressBar;
