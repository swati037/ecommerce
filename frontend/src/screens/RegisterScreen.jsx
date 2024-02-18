import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../assests/styles/screens/RegisterScreen.css'



const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);


  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/product';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);


  const handleSignUp = () => {
    if (isTermsChecked) {
      console.log('Signing up...');
    } else {
      console.log('Please accept the terms and conditions.');
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div style={{ marginLeft: '20%' }}>
        <h1 className="sign-up-h1">Sign Up</h1>
  
        <Row className='py-2'>
          <Col className="col-style-register">
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="link-style-register">
              Sign In
            </Link>
          </Col>
        </Row>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <div style={{
              position: 'relative',
              width: '70%',
            }}>
              <input
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border-0 border-bottom input-style-register'
              ></input>
            </div>
          </Form.Group>
  
          <Form.Group className='my-2' controlId='email'>
            <div style={{
              position: 'relative',
              width: '70%',
            }}>
              <input
                type='email'
                placeholder='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border-0 border-bottom input-style-register'
              ></input>
            </div>
          </Form.Group>
  
          <Form.Group className='my-2' controlId='password'>
            <Row>
              <Col>
                <div style={{
                  position: 'relative',
                  width: '70%',
                }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-0 border-bottom input-style-register'
                    style={{
                      marginBottom: '30px',
                    }}
                    autoComplete='current-password'
                  />
                  <div onClick={togglePasswordVisibility} style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '36px',
                    cursor: 'pointer',
                  }}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </Col>
            </Row>
          </Form.Group>
  
          <Form.Group className='my-2' controlId='confirmPassword'>
            <Row>
              <Col>
                <div style={{
                  position: 'relative',
                  width: '70%',
                }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='border-0 border-bottom input-style-register-pass'
                    autoComplete='current-password'
                  />
                  <div onClick={togglePasswordVisibility} style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '36px',
                    cursor: 'pointer',
                  }}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </Col>
            </Row>
          </Form.Group>
  
          <Form.Check
            type="checkbox"
            label={
              <span className='span-style-register-black'>
                I agree with <a href="/terms" target="_blank" rel="noopener noreferrer" className="span-style-register-pink">Privacy Policy </a> and <a href="/terms" target="_blank" rel="noopener noreferrer" className="span-style-register-pink">Terms of Use</a>
              </span>
            }
            checked={isTermsChecked}
            onChange={handleCheckboxChange}
          />
          <Button disabled={isLoading || !isTermsChecked} type='submit' variant='primary' onClick={handleSignUp} className="sign-up-button"
            onMouseOver={(e) => (e.target.style.background = '#141718')}
            onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
          >
            Register
          </Button>
  
          {isLoading && <Loader />}
        </Form>
      </div>
    </FormContainer>
  );
};  

export default RegisterScreen;
