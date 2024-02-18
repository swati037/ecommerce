import { Container, Row, Col } from 'react-bootstrap';
import designImg from '../assests/DT_logo.jpg';
import { Link } from 'react-router-dom';

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaRegClock,
} from 'react-icons/fa6';

import '../assests/styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ width: '100%', height: '60%', flexShrink: 0, position: 'relative' }}>
      <div className="container1-style">
        <Row>
          <Col></Col>
          <Col>
            <div className="footer-style">
              <p className="para-footer-style">
                DESIGN BY: <img src={designImg} alt="Design Logo" style={{ marginLeft: '20px', height: '40px' }} />
              </p>
            </div>
          </Col>
          <Col></Col>
        </Row>

        <Container style={{ paddingTop: '3%', paddingLeft: '10px' }}>
          <Row>
            <Col xs={8} md={4}>
              <h3 className="aboutUs">Get in Touch</h3>
              <p className="paragraph3-style">
                <FaLocationDot /> A/302, Ganga Narayan Smruti CHSL, BP Rd, above Saxena Hospital, Bhayandar East,
                Maharashtra 401105
              </p>
              <p className="paragraph3-style">
                <FaPhone /> +91 1234567890
              </p>
              <p className="paragraph3-style">
                <FaEnvelope /> info@example.com
              </p>
              <p className="paragraph3-style">
                <FaRegClock /> Mon - Fri, 9AM - 10PM
              </p>
            </Col>
            <Col xs={8} md={4}>
              <h3 className="aboutUs">Useful Links</h3>
              <Link to="/" className="paragraph3-style">
                <p>Home</p>
              </Link>
              <Link to="/product" className="paragraph3-style">
                <p>Shop</p>
              </Link>
              <Link to="/terms" className="paragraph3-style">
                <p>Terms & Condition</p>
              </Link>
              <Link to="/contact-us" className="paragraph3-style">
                <p>Contact Us</p>
              </Link>
              <Link to="/about-us" className="paragraph3-style">
                <p>About Us</p>
              </Link>
            </Col>
            <Col xs={8} md={4}>
              <h3 className="aboutUs">About Us</h3>
              <p className="paragraph3-style">
                At Shachi, we're on a mission to revolutionize hydration. Fueled by a passion for delivering pure and
                revitalizing drinking water, we stand out in the competitive landscape of packaged water
              </p>
              <Row>
                <Col>
                  <p className="paragraph3-style1">
                    <FaFacebook />
                  </p>
                </Col>
                <Col>
                  <p className="paragraph3-style1">
                    <FaInstagram />
                  </p>
                </Col>
                <Col>
                  <p className="paragraph3-style1">
                    <FaTwitter />
                  </p>
                </Col>
                <Col>
                  <p className="paragraph3-style1">
                    <FaWhatsapp />
                  </p>
                </Col>
                <Col></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="below-footer">
        <h1 className="copy-style">&copy; {currentYear}. SHACHI. All Right Reserved</h1>
      </div>
    </footer>
  );
};

export default Footer;
