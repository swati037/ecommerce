import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeliverOrderMutation,
  useShippingOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../../slices/ordersApiSlice';
import SideNavBar from './SideNavBar';
import '../../assests/styles/admin/AdminOrderScreen.css'


const AdminOrderScreen = () => {
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
      <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
        <h1 className="admin-orderscreen-header">Order ID: {order._id}</h1>
        <Row>
          <Col ></Col>
          <Col md={5}>
            <ListGroup variant='flush' className="list-group-container-admin-orderscreen">
            <ListGroup.Item>
              <h2 className="contact-info-heading-admin-orderscreen">Contact Information</h2>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                paddingBottom: '5px',
              }}>
                <h2 className="name-heading-admin-orderscreen">Name</h2>
                <p className="user-name-paragraph-admin-orderscreen">{order.user.name}</p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <h2 className="name-heading-admin-orderscreen">Email Address</h2>
                <p className="user-name-paragraph-admin-orderscreen">
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <h2 className="name-heading-admin-orderscreen">Phone Number</h2>
                <p className="user-name-paragraph-admin-orderscreen">{order.shippingAddress.phoneNumber}</p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <h2 className="name-heading-admin-orderscreen">Address</h2>
                <p className="user-name-paragraph-admin-orderscreen">
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
              </div>

              <div style={{
                margin: '16px',
              }}></div>

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
              <p className="user-name-paragraph-order">{formattedSelectedDateAndTime}</p>
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
              <h2 className="contact-info-heading-admin-orderscreen">Payment Method</h2>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                paddingBottom: '5px',
              }}>
                <h2 className="name-heading-admin-orderscreen">Method</h2>
                <p className="user-name-paragraph-admin-orderscreen">{order.paymentMethod}</p>
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
          <div className="containerStyle-admin-orderscreen">
            <ListGroup variant='flush'>
              <h2 className="orderSummaryHeading-admin-orderscreen">Order Summary</h2>

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
                          <Link
                            to={`/product/${item.product}`}
                            className="linkStyle-admin-orderscreen"
                            onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
                            onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}
                          >
                            {item.name}
                          </Link>
                          <p className="pStyle-admin-orderscreen">{item.category}</p>
                          <p className="pStyle-admin-orderscreen-item">{item.qty} x Rs {item.price}</p>
                        </Col>
                        <Col md={4}>
                          <p className="pStyle-admin-orderscreen-itemQty">Rs {(item.qty * (item.price * 100)) / 100}</p>
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
                  <Col className="colStyle-admin-orderscreen" style={{ lineHeight: '1px' }}>Sub Total</Col>
                  <Col className="colStyle-admin-orderscreen-orderPrice" style={{ lineHeight: '1px' }}>Rs {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className="colStyle-admin-orderscreen" style={{ lineHeight: '10px' }}>Shipping</Col>
                  <Col className="colStyle-admin-orderscreen-orderPrice" style={{ lineHeight: '10px' }}>Rs {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="colStyle-admin-orderscreen" style={{ lineHeight: '10px' }}>Tax</Col>
                  <Col className="colStyle-admin-orderscreen-orderPrice" style={{ lineHeight: '10px' }}>Rs {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="colStyle-admin-orderscreen-totalPriceName">Total</Col>
                  <Col className="colStyle-admin-orderscreen-totalPrice">Rs {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
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
                      className="buttonStyle-admin-orderscreen"
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
                order.isPaid && order.isOutForShipping &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      className="buttonStyle-admin-orderscreen"
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

        <Col ></Col>
      </Row>
    </div>

    <SideNavBar style={{ order: 2, flex: '0 0 auto' }} />
    </>
  );
};

export default AdminOrderScreen;
