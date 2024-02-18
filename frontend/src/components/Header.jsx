import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LuShoppingBag } from "react-icons/lu";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assests/logo.jpg';
import { resetCart } from '../slices/cartSlice';
import '../assests/styles/components/Header.css'


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [isHiddenSm, setIsHiddenSm] = useState(window.innerWidth <= 991.98);
  const [isHiddenLg, setIsHiddenLg] = useState(window.innerWidth > 991.98);

  useEffect(() => {
    const handleResize = () => {
      setIsHiddenSm(window.innerWidth <= 991.98);
      setIsHiddenLg(window.innerWidth > 991.98);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header style={{ background: 'var(--black, #141108)' }}>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect style={{ marginRight: '10px' }}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='Shachi' style={{ height: '60px', width: 'auto' }} />
            </Navbar.Brand>
          </LinkContainer>
  
          <LinkContainer to='/cart' hidden={isHiddenLg} className="link-header-container">
            <Nav.Link>
              <LuShoppingBag className="custom-style" />
              {cartItems.length > 0 && (
                <Badge pill bg='success'>
                  <div>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </div>
                </Badge>
              )}
            </Nav.Link>
          </LinkContainer>
  
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/' className="link-header-name-container">
                <Nav.Link>
                  Home
                  <Badge pill bg='success' style={{ marginLeft: '5px', color: 'var(--Color-Secondary-White, #FFF)' }}></Badge>
                </Nav.Link>
              </LinkContainer>
  
              <LinkContainer to='/product' className="link-header-name-container">
                <Nav.Link>
                  Shop
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}></Badge>
                </Nav.Link>
              </LinkContainer>
  
              <LinkContainer to='/about-us' className="link-header-name-container">
                <Nav.Link>
                  About Us
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}></Badge>
                </Nav.Link>
              </LinkContainer>
  
              <LinkContainer to='/contact-us' className="link-header-name-container">
                <Nav.Link>
                  Contact Us
                </Nav.Link>
              </LinkContainer>
  
              <LinkContainer to='/cart' hidden={isHiddenSm} className="link-header-cart-container">
                <Nav.Link>
                  <LuShoppingBag className="custom-style" />
                  {cartItems.length > 0 && (
                    <Badge pill bg='success'>
                      <div>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </div>
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
  
              
                {userInfo && !userInfo.isAdmin? (
                  <div className="custom-button">
                    <NavDropdown title={userInfo.name} id='username'>
                      <NavDropdown.Item className="custom-dropdown-item">
                        <Link to="/myOrders" style={{ textDecoration: 'none', color: 'inherit' }}>
                          My Orders
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item className="custom-dropdown-item">
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                          Profile
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler} className="custom-dropdown-item">
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                ) : userInfo && userInfo.isAdmin ? (null) : (
                  <div className="custom-button">
                    <LinkContainer to='/login'>
                      <Nav.Link>
                        Sign In
                      </Nav.Link>
                    </LinkContainer>
                  </div>
                )}
              

              
              {userInfo && userInfo.isAdmin && (
                <div className="custom-button">
                  <LinkContainer to='/admin/dashboard' >
                    <Nav.Link>
                      Dashboard
                      <Badge pill bg='success' style={{ marginLeft: '5px', color: 'var(--Color-Secondary-White, #FFF)' }}></Badge>
                    </Nav.Link>
                  </LinkContainer>
                </div>
                )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}  
export default Header;
