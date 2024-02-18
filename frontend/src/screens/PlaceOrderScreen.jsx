import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import '../assests/styles/screens/PlaceOrderScreen.css';


const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  const selectedDateTime = new Date(cart.shippingAddress.selectedDateTime);
  const formattedDate = selectedDateTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div>
      <h1 className="place-order-h1">Place Order</h1>
      <div style={{justifyContent: 'center', alignItems: 'center', marginBottom: '80px', overflow: 'hidden'}}>
        <CheckoutSteps step1 step2 step3 step4/>
      </div>
      
      <Row>
      <Col></Col>
      <Col md={5}>
        <ListGroup variant='flush' className="place-order-listGroup">
          <ListGroup.Item>
            <h2 className="contact-info-heading-place-order">Contact Information</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-place-order">Name</h2>
              <p className="user-name-paragraph-place-order"> {userInfo.name}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-place-order">Email Address</h2>
              <p className="user-name-paragraph-place-order"> {userInfo.email}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-place-order">Phone Number</h2>
              <p className="user-name-paragraph-place-order"> {cart.shippingAddress.phoneNumber}</p>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2 className="contact-info-heading-place-order">Shipping Address</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <h2 className="name-heading-place-order">Street Address</h2>
              <p className="user-name-paragraph-place-order"> {cart.shippingAddress.address}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <h2 className="name-heading-place-order">City / Town</h2>
              <p className="user-name-paragraph-place-order"> {cart.shippingAddress.city}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <h2 className="name-heading-place-order">Country</h2>
              <p className="user-name-paragraph-place-order"> {cart.shippingAddress.country}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <h2 className="name-heading-place-order">Postal Code</h2>
              <p className="user-name-paragraph-place-order"> {cart.shippingAddress.postalCode}</p>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2 className="contact-info-heading-place-order">Shipping Date</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <h2 className="name-heading-place-order">Delivery Date</h2>
              <p className="user-name-paragraph-place-order"> {formattedDate}</p>
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2 className="contact-info-heading-place-order">Payment Method</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '5px',
            }}>
              <h2 className="name-heading-place-order">Method</h2>
              <p className="user-name-paragraph-place-order"> {cart.paymentMethod}</p>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Col>

        
      <Col md={6}>
        <div className="custom-container-place-order">
          <ListGroup variant='flush'>
            <h2 className="place-order-summary-heading">Order Summary</h2>

            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={3}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={1}></Col>
                      <Col>
                        <Link
                          to={`/product/${item._id}`}
                          className="product-link-place-order"
                          onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
                          onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}
                        >
                          {item.name}
                        </Link>
                        <p className="user-name-paragraph-place-order">{item.category}</p>
                        <p className="user-name-paragraph-place-order">{item.qty} x Rs {item.price} </p>
                      </Col>
                      <Col md={4}>
                        <p className="price-paragraph-order">Rs {(item.qty * (item.price * 100)) / 100}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                </ListGroup.Item>
              </ListGroup>
            )}

            <ListGroup.Item>
              <Row>
                <Col className="subtotal-col-order">Sub Total</Col>
                <Col className="order-total-col">Rs {cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col className="subtotal-col-order">Shipping</Col>
                <Col className="order-total-col">Rs {cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col className="subtotal-col-order">Tax</Col>
                <Col className="order-total-col">Rs {cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col className="total-col-order">Total</Col>
                <Col className="order-total-final-col">Rs {cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && (
                <Message variant='danger'>{error.data.message}</Message>
              )}
            </ListGroup.Item>

            <Button
              type='button'
              className='btn-block button-style-order'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
              onMouseOver={(e) => (e.target.style.background = '#141718')}
              onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
            >
              Place Order
            </Button>

            {isLoading && <Loader />}
          </ListGroup>
        </div>
      </Col>
      
      <Col></Col>
    </Row>
   </div>
  );
};

export default PlaceOrderScreen;
