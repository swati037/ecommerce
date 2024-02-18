import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddressBar from '../components/AddressBar';
import { FaArrowRight } from 'react-icons/fa';
import '../assests/styles/screens/AboutUs.css';

function AboutUs() {
  return (
    <Container>
      <h2 className="about-us-title">
        Get to know us better
      </h2>
      <p className="about-us-paragraph">
        Get to know us better as we unfold the chapters of our story, passion, and commitment.
      </p>

      <Row>
        <Col md={6} style={{ marginTop: '20px' }}>
          <div className='image-placeholder'>
      
          </div>
        </Col>

        <Col md={6} style={{ marginTop: '20px' }}>
          <div className="content">
            <div className="title">
              <Row>
                <h1 className="about-us-heading">Our Story</h1>
              </Row>
              <Row>
                <p className="phosfluorescently-en">
                  <span className="about-us-span">Sacchi </span>
                  <span className="text-wrapper-2 about-us-text-wrapper-2">
                    is a packed purified water supplier based in Mumbai, India. Est since 2019. <br />
                    Our customer service is always prepared to support you 24/7
                  </span>
                </p>
              </Row>
              <Row>
                <button className="button">
                  <Link className="get-started-wrapper" style={{ textDecoration: 'none' }} to='/product'>
                    <div className="get-started about-us-get-started">Shop Now <FaArrowRight /> </div>
                  </Link>
                </button>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <div style={{ paddingTop: '15%' }}>
        
      </div>

      <h2 className="about-us-crafting-title">
        Crafting Moments in Every Bottle
      </h2>
      <p className="about-us-crafting-paragraph">
        Crafting moments in every bottle — where passion meets artistry, and each sip tells a unique story.
      </p>

      <Row>
        <Col sm={12}>
          <ListGroup variant='flush' className="about-us-list-group">
            <h1 className="about-us-believe-heading">
              We believe in the purity of water. We’re passionate about the element that sustains the whole world.
            </h1>

            <h1 className="about-us-neutral-heading">
              Hydrate effortlessly with our online packed water service. We bring purity to your doorstep, delivering
              refreshment with reliability. Embrace the ease of staying hydrated as we redefine your water source, ensuring
              every drop meets the highest standards. Quench your thirst with convenience and quality, making hydration simple
              and dependable.
            </h1>
          </ListGroup>
        </Col>
      </Row>

      <div style={{ marginTop: '13%' }}>
        <AddressBar />
      </div>
    </Container>
  );
}

export default AboutUs;
