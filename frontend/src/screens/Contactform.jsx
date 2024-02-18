import Container from 'react-bootstrap/Container';
import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import { Button, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddressMap from '../components/MapComponent';
import AddressBar from '../components/AddressBar';
import '../assests/styles/screens/ContactForm.css';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_tpm9stm", "template_mcd4z5m", form.current, "qFlFWlyVqwr3xmzni")
      .then((result) => {
        console.log(result.text);
        console.log("message sent");
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <Container>
      <h1 className="conversation-header-contact">Let's Start a Conversation</h1>
      <Row>
        <Col sm={6}>
          <ListGroup variant='flush' className="list-group-container-contact">
            <h1 className="heading-style-contact">Drop Us a Mail</h1>
            <Row className='py-2'>
              <Col className="col-style-contact">
                Note:{' '}
                <Link className="link-style-contact">
                  All the fields are mandatory
                </Link>
              </Col>
            </Row>
            <div style={{
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <form ref={form} class="form-group" onSubmit={sendEmail}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                }}>
                  <input
                    type='text'
                    name='user_name'
                    placeholder='Enter name'
                    className='border-0 border-bottom input-style-contact'
                  />
                </div>

                <div style={{
                  position: 'relative',
                  width: '100%',
                }}>
                  <input
                    type='email'
                    name='user_email'
                    placeholder='Enter email'
                    className='border-0 border-bottom input-style-contact'
                  />
                </div>

                <div style={{
                  position: 'relative',
                  width: '100%',
                }}>
                  <input
                    type='text'
                    name='phone number'
                    placeholder='Enter phone number'
                    className='border-0 border-bottom input-style-contact'
                  />
                </div>

                <div style={{
                  position: 'relative',
                  width: '100%',
                }}>
                  <textarea
                    name="message"
                    placeholder='Enter message'
                    className='border-0 border-bottom input-style-contact'
                  />
                </div>

                <Button type='submit' className="button-style-contact"
                  onMouseOver={(e) => (e.target.style.background = '#141718')}
                  onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                >
                  Send
                </Button>
              </form>
            </div>
          </ListGroup>
        </Col>

        <Col sm={6}>
          <ListGroup variant='flush' className="list-group-container-contact">
            <h1 className="heading-style-contact-meetus">Meet Us</h1>
            <div style={{
              gap: '16px',
              paddingBottom: '25px',
            }}>
              <AddressMap />
            </div>
          </ListGroup>
        </Col>

        <Col></Col>
      </Row>

      <div style={{ marginTop: '80px' }}>
        <AddressBar />
      </div>
    </Container>
  );
};

export default ContactForm;
