import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import { HiXMark } from "react-icons/hi2";
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import '../assests/styles/screens/CartScreen.css'


const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <h1 className="cart-header">
        Shopping Cart
      </h1>
      <div style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '80px', overflow: 'hidden' }}>
        <CheckoutSteps step1 />
      </div>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/product'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="mb-4 mt-4">
                  <Col md={2} style={{ margin: '10px' }}>
                    <Image src={item.image} alt={item.name} fluid rounded style={{ width: '100%', height: 'auto', maxHeight: '400px' }} />
                  </Col>
                  <Col md={3}>
                    <div style={{ alignSelf: 'stretch' }}>
                      <p className="cart-paragraph" onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')} onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}>
                        <Link to={`/product/${item._id}`}>
                          {item.name}
                        </Link>
                      </p>
                    </div>
                    <p className="cart-category-paragraph">
                      {item.category}
                    </p>
                    <div className='flex-container-cart'>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item._id)}
                        className="remove-button-style"
                      >
                        <HiXMark style={{ fontSize: '24px', verticalAlign: 'middle' }} /> Remove
                      </Button>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div style={{ marginBottom: '18px', marginTop: '18px' }}>
                      <Form.Control
                        className="form-control-style-cart"
                        as='select'
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </Col>
                  <Col md={2}>
                    <Row className="align-items-center">
                      <Col xs="auto" className="col-price-cart">
                        Price
                      </Col>
                      <Col xs="auto" className="col-item-price-cart">
                        Rs {item.price}
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2}>
                    <Row className="align-items-center">
                      <Col xs="auto" className="col-price-cart">
                        Total
                      </Col>
                      <Col xs="auto" className="col-item-price-cart">
                        Rs {(item.price * item.qty).toFixed(2)}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
  
      <Col xs={12} md={6} lg={4}>
        <div className="container-style-div">
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className="cart-summary-heading">
                Cart Summary
              </h2>
              <Row>
                <Col>
                  <p className="total-items-label">
                    Total Items
                  </p>
                </Col>
                <Col>
                  <p className="total-items-value">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </p>
                </Col>
              </Row>
  
              <Row>
                <Col>
                  <p className="total-items-label">
                    Total Price
                  </p>
                </Col>
                <Col>
                  <p className="total-items-value">
                    Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-center">
              <Button
                type='button'
                className='btn-block proceed-to-checkout-button'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                onMouseOver={(e) => (e.target.style.background = '#141718')}
                onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Col>
    </Row>
  );  
};

export default CartScreen;
