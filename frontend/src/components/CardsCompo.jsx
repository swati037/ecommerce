import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaUsers, FaCertificate, FaLock, FaShoppingCart } from 'react-icons/fa';
import '../assests/styles/components/CardsCompo.css';

const CardItem = ({ icon, headline, caption, value }) => (
  <Col md={3} style={{ marginBottom: '20px' }}>
    <div className="card-container">
      {icon && React.cloneElement(icon, { style: { color: 'var(--PINK, #D994BC)', fontSize: '2.5em' } })}
      <h1 className="card-headline">{headline}</h1>
      <p className="card-caption">{value}</p>
    </div>
  </Col>
);

const CardItems = () => (
  <div>
    <h2 className="head-style">
      Achieving Excellence Together
    </h2>
    <p className="para1-style">
      Experience the difference – from the first sip to the last drop.
    </p>

    <Row style={{ marginLeft: '20px', marginRight: '20px' }}>
      <CardItem icon={<FaUsers />} headline="Satisfied Customers" value="159" />
      <CardItem icon={<FaLock />} headline="Quality of Service" value="99%" />
      <CardItem icon={<FaCertificate />} headline="Quality Certificates" value="33" />
      <CardItem icon={<FaShoppingCart />} headline="Available Products" value="30" />
    </Row>
  </div>
);

export default CardItems;
