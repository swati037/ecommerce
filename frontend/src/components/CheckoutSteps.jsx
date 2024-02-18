import React from 'react';
import { Nav, Container, Row, Col  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../assests/styles/components/CheckoutSteps.css'


const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
 

  return (
    <Container fluid  className="justify-content-center">
      <Row style={{
        display: 'flex',
        width: '100%',
        alignItems: 'flex-start',
      }}>
        
          
        <Col xs={3}>
              {step1 ? (
                <LinkContainer to='/cart' className="link-container">
                  <Nav.Link className="link-style-pink">
                    <div className="paragraph-container-style">
                      <p className="para-style">1</p>
                      <p className="para-style2">Shopping Cart</p>
                    </div>
                  </Nav.Link>
                  </LinkContainer>
              ) : (
                
                <Nav.Link disabled className="link-style">
                  <div className="paragraph-container-style">
                    <p className="paragraph-black-style">1</p>
                    <p className="paragraph-black-text-style">Shopping Cart</p>
                  </div>
                </Nav.Link>
                
              )}
            </Col>
         
            <Col xs={3}>
              {step2 ? (
                <LinkContainer to='/login' className="link-container">
                  <Nav.Link className="link-style-pink">
                    <div className="paragraph-container-style">
                      <p className="para-style">2</p>
                      <p className="para-style2">Account Sign In</p>
                    </div>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link disabled className="link-style">
                  <div className="paragraph-container-style">
                    <p className="paragraph-black-style">2</p>
                    <p className="paragraph-black-text-style">Account Sign In</p>
                  </div>
                </Nav.Link>
              )}
            </Col>
          
            <Col xs={3}>
              {step3 ? (
                <LinkContainer to='/shipping' className="link-container">
                  <Nav.Link className="link-style-pink">
                    <div className="paragraph-container-style">
                      <p className="para-style">3</p>
                      <p className="para-style2">Shipping Detail</p>
                    </div>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link disabled className="link-style">
                  <div className="paragraph-container-style">
                    <p className="paragraph-black-style">3</p>
                    <p className="paragraph-black-text-style">Shipping Detail</p>
                    
                  </div>
                </Nav.Link>
              )}
            </Col>
         
            <Col xs={3}>
              {step4 ? (
                <LinkContainer to='/placeorder' className="link-container">
                  <Nav.Link className="link-style-pink">
                    <div className="paragraph-container-style">
                      <p className="para-style">4</p>
                      <p className="para-style2">Place Order</p>
                    </div>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link disabled className="link-style">
                  <div className="paragraph-container-style">
                    <p className="paragraph-black-style">4</p>
                    <p className="paragraph-black-text-style">Place Order</p>
                  </div>
                </Nav.Link>
              )}
            </Col>
      </Row>
    </Container>
  );
  
  
};

export default CheckoutSteps;
