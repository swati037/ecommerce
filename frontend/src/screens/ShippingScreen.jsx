import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { savePaymentMethod } from '../slices/cartSlice';
import '../assests/styles/screens/ShippingScreen.css'


const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [paymentMethod, setPaymentMethod] = useState('RazorPay');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, selectedDateTime: selectedDate, phoneNumber, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };


  const CustomInput = ({ value, onClick }) => (
    <input
      className="shipping-screen-h1"
      value={value}
      onClick={onClick}
      placeholder="Enter date"
    />
  );

  
  
  return (

    <div>
      <h1 className="shipping-header">Shipping</h1>
      <div style={{justifyContent: 'center', alignItems: 'center', marginBottom: '80px', overflow: 'hidden'}}>
        <CheckoutSteps step1 step2 step3/>
      </div>

      <FormContainer>
        <Form onSubmit={submitHandler}>

          <div className="shipping-screen-container">
          <h4 className="shipping-screen-contact-info-heading">
            Contact Information
          </h4>


          <Form.Group controlId='name'>
            <Form.Label className="shipping-screen-form-label-style">Name</Form.Label>
            <Form.Control
              className="shipping-screen-input-container"
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label className="shipping-screen-form-label-style">Email Address</Form.Label>
            <Form.Control
              className="shipping-screen-input-container"
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

        <div>
          <Form.Label className="shipping-screen-form-label-style">Phone Number </Form.Label>
          <Form.Control
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="shipping-screen-input-container"
          />
        </div>
      </div>

      <div className="shipping-screen-container">
        <h4 className="shipping-screen-contact-info-heading">
          Shipping Details
        </h4>

        <Form.Group className='my-2' controlId='address'>
          <Form.Label className="shipping-screen-form-label-style">Street Address</Form.Label>
          <Form.Control
            className="shipping-screen-input-container"
            type='text'
            placeholder='Enter Street Address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label className="shipping-screen-form-label-style">Town / City</Form.Label>
          <Form.Control
            className="shipping-screen-input-container"
            type='text'
            placeholder='Enter Town / City'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label className="shipping-screen-form-label-style">Country</Form.Label>
          <Form.Control
            className="shipping-screen-input-container"
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label className="shipping-screen-form-label-style">Postal Code</Form.Label>
          <Form.Control
            className="shipping-screen-input-container"
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className="shipping-screen-form-label-style" style={{
            paddingTop: '12px',
            marginBottom: '8px',
          }}>
            Shipping Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            customInput={<CustomInput />}
          />
        </div>
      </div>

    <div className="shipping-screen-container">
      <h4 className="shipping-screen-contact-info-heading">
        Payment Method
      </h4>

      <Form.Group>
        <Form.Label as='legend' className="shipping-screen-form-label-style">Select Method</Form.Label>
        <Col>
          <Form.Check
            className='my-2 shipping-screen-check-style'
            type='radio'
            label='RazorPay or Credit Card'
            id='Razorpay'
            name='paymentMethod'
            value='Razorpay'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          >

          </Form.Check>

          <Form.Check
            className='my-2 shipping-screen-check-style'
            type='radio'
            label='Cash on Delivery'
            id='CashOnDelivery'
            name='paymentMethod'
            value='CashOnDelivery'
            onChange={(e) => setPaymentMethod(e.target.value)}
          >

          </Form.Check>
        </Col>
      </Form.Group>
    </div>

    <Button
      className="shipping-screen-button"
      onMouseOver={(e) => (e.target.style.background = '#141718')}
      onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
      type='submit' variant='primary'>
      Continue
    </Button>

    </Form>
    </FormContainer>
   </div>
  );
};

export default ShippingScreen;
