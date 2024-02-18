import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShippingFast } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import '../assests/styles/components/ShoppingBar.css'; 


function ShoppingBar() {
  return (
    <footer style={{ marginTop: '50px' }}>
      <Row style={{ background: 'var(--neutral-02100, #F3F5F7)', paddingLeft: '70px', paddingRight: '100px' }}>
        <Col md={3}>
          <div className="container-style">
            <FaShippingFast style={{ color: 'var(--PINK, #D994BC)', fontSize: '2.5em' }} />
            <h1 className="headline-style">
              Free Shipping
            </h1>
            <p className="caption-style">
              Order above Rs 200
            </p>
          </div>
        </Col>

        <Col md={3}>
          <div className="container-style">
            <FaMoneyCheckDollar style={{ color: 'var(--PINK, #D994BC)', fontSize: '2.5em' }} />
            <h1 className="headline-style">
              Money-back
            </h1>
            <p className="caption-style">
              7 days guarantee
            </p>
          </div>
        </Col>

        <Col md={3}>
          <div className="container-style">
            <FaLock style={{ color: 'var(--PINK, #D994BC)', fontSize: '2.5em' }} />
            <h1 className="headline-style">
              Secure Payments
            </h1>
            <p className="caption-style">
              Secured by XYZ
            </p>
          </div>
        </Col>

        <Col md={3}>
          <div className="container-style">
            <FaPhoneAlt style={{ color: 'var(--PINK, #D994BC)', fontSize: '2.5em' }} />
            <h1 className="headline-style">
              24/7 Support
            </h1>
            <p className="caption-style">
              Phone and Email support
            </p>
          </div>
        </Col>
      </Row>
    </footer>
  );
}

export default ShoppingBar;
