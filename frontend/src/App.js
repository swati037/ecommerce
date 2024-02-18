import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import ImageProduct from './components/ImageProduct';
import ContactProduct from './components/ImageContact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingProduct from './components/LandingProductFirst';
import ShoppingBar from './components/ShoppingBar';
import ImageAboutUs from './components/ImageAboutUs';



const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();



  const isProductPath = location.pathname === './product';


  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
     {!location.pathname.includes('/admin/') && <Header />}
     {location.pathname === '/' && <LandingProduct />}
     {location.pathname === '/product' && <ImageProduct />}
     {location.pathname === '/contact-us' && <ContactProduct />}
     {/* {location.pathname === '/about-us' && <ImageAboutUs />} */}
      <ToastContainer />
 
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      {location.pathname === '/contact-us' && <ShoppingBar />}
      {location.pathname === '/about-us' && <ShoppingBar />}
      {!location.pathname.includes('/admin/') && <Footer />}
    </>
  );
};

export default App;
