import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../assests/styles/screens/LoginScreen.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  let redirect = sp.get('redirect') || '/product';

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div style={{ marginLeft: '20%' }}>
        <h1 className="sign-in-h1">Sign In</h1>

        <Row className="py-2">
          <Col className="col-style-login">
            Don't have an account yet?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="link-style-login"
            >
              Sign Up
            </Link>
          </Col>
        </Row>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <div style={{ position: 'relative', width: '70%' }}>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 border-bottom input-style-login"
                style={{ marginTop: '30px' }}
              />
            </div>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Row>
              <Col>
                <div style={{ position: 'relative', width: '70%' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 border-bottom input-style-login"
                    autoComplete="current-password"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '0',
                      bottom: '36px',
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </Col>
            </Row>

            <Col>
              {/* <div className="forget-passsword">Forgot password?</div> */}
            </Col>
          </Form.Group>

          <Button
            disabled={isLoading}
            type="submit"
            className="sign-in-button"
            onMouseOver={(e) => (e.target.style.background = '#141718')}
            onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
          >
            Sign In
          </Button>

          {isLoading && <Loader />}
        </Form>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
