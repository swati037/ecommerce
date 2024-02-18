import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeliverOrderMutation,
  useShippingOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';
import '../assests/styles/screens/OrderScreen.css';


const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

    const [shippingOrder, { isLoading: loadingShipping }] =
    useShippingOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'INR',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }


  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };


  const shippingHandler = async () => {
    await shippingOrder(orderId);
    refetch();
  };


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script has loaded");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initPayment = (data, orderId) => {
    const options = {
      key: "rzp_test_UV1aTURnzin2ov",
      amount: data.amount,
      currency: data.currency,
      name: order._id,
      description: "Test Transaction",
  
      order_id: data.id,
      
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/api/payment/verify";
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...response, orderId }),
          };
          const verifyResponse = await fetch(verifyUrl, requestOptions);
          const verifyData = await verifyResponse.json();
          console.log(verifyData);

          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:5000/api/payment/orders";
      const response = await fetch(orderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Math.round(order.totalPrice), orderId: order._id }), 
      });
  
      console.log(response); 

      if (!response.ok) {
        throw new Error(`Failed to fetch order: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data.order);
      
      initPayment(data.data, order._id); 
    } catch (error) {
      console.log(error);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  let formattedSelectedDateAndTime;

  if (order && order.shippingAddress) {
    formattedSelectedDateAndTime = formatDate(order.shippingAddress.selectedDateTime);
  }

  const formattedPaidAt = order ? formatDate(order.paidAt) : null;

  const formattedDeliveredAt = order ? formatDate(order.deliveredAt) : null;

  const formattedOutForShippingAt = order ? formatDate(order.outForShippingAt) : null;


  return isLoading ? (
  <Loader />
) : error ? (
  <Message variant='danger'>{error.data.message}</Message>
) : (
  <>
    <h1 className="order-header">Order ID: {order._id}</h1>
    <Row>
      <Col></Col>
      <Col md={5}>
        <ListGroup variant='flush' className="list-group-container-order">
          <ListGroup.Item>
            <h2 className="contact-info-heading-order">Contact Information</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-order">Name</h2>
              <p className="user-name-paragraph-order">{order.user.name}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-order">Email Address</h2>
              <p className="user-name-paragraph-order">
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-order">Phone Number</h2>
              <p className="user-name-paragraph-order">{order.shippingAddress.phoneNumber}</p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-order">Address</h2>
              <p className="user-name-paragraph-order">
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
            </div>

            <div  style={{ margin: '16px' }}>

            </div>
            {order.isOutForShipping ? (
              <Message variant='success'>
                Out for Shipping on {formattedOutForShippingAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Out for Shipping</Message>
            )}
          </ListGroup.Item>


          <ListGroup.Item>
            <h2 className="contact-info-heading-order">Date To Be Delivered On</h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-order">Date</h2>
              <p className="user-name-paragraph-order"> {formattedSelectedDateAndTime}</p>
            </div>

            <div  style={{ margin: '16px' }}>

            </div>

            {order.isDelivered ? (
              <Message variant='success'>
                Delivered on {formattedDeliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </ListGroup.Item>  


          <ListGroup.Item>
            <h2 className="contact-info-heading-order">Payment Method</h2>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <h2 className="name-heading-order">Method</h2>
              <p className="user-name-paragraph-order"> {order.paymentMethod}</p>
            </div>

            <div  style={{ margin: '16px' }}>

            </div>

            {order && order.isPaid ? (
              <Message variant='success'>Paid on {formattedPaidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroup.Item>  
        </ListGroup>
      </Col>

       
      <Col md={6}>
        <div className="custom-container-order">
          <ListGroup variant='flush'>

            <h2 className="order-summary-heading">Order Summary</h2>

            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
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
                        <Link to={`/product/${item.product}`}
                          className="product-link-order"
                          onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
                          onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}>
                          {item.name}
                        </Link>
                        <p className="user-name-paragraph-order">{item.category}</p>
                        <p className="user-name-paragraph-order">{item.qty} x Rs {item.price} </p>
                      </Col>
                      <Col md={4}>
                        <p className="price-paragraph-order">Rs {(item.qty * (item.price * 100)) / 100}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            )}

            <ListGroup.Item>
              <Row>
                <Col className="subtotal-col-order">Sub Total</Col>
                <Col className="order-total-col">Rs {order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col className="subtotal-col-order">Shipping</Col>
                <Col className="order-total-col">Rs {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col className="subtotal-col-order">Tax</Col>
                <Col className="order-total-col">Rs {order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col className="total-col-order">Total</Col>
                <Col className="order-total-final-col">Rs {order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
        
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}

                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    {/* {loadingShipping && <Loader />} */}
                    <Button
                      className="button-style-order"
                      onMouseOver={(e) => (e.target.style.background = '#141718')}
                      onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                      onClick={handlePayment}
                    >
                      Ready to Pay
                    </Button>

                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </ListGroup.Item>
            )}

            {loadingShipping && <Loader />}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isOutForShipping && (
                <ListGroup.Item>
                  <Button
                    className="button-style-order"
                    onMouseOver={(e) => (e.target.style.background = '#141718')}
                    onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                    onClick={shippingHandler}
                  >
                    Out For Shipping
                  </Button>
                </ListGroup.Item>
            )}

            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              order.isOutForShipping &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    className="button-style-order"
                    onMouseOver={(e) => (e.target.style.background = '#141718')}
                    onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </Col>
      <Col>  </Col>
    </Row>
    </>
  );
};

export default OrderScreen;
