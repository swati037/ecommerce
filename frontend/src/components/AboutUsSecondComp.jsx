import dealImg from '../assests/DealoftheDay.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const AboutUsSecondComp = () => {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000); // Update every second

    return () => clearInterval(timerInterval);
  }, []);

  function calculateRemainingTime() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10); // 10 days from now

    const now = new Date();
    const timeDifference = targetDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    // console.log(minutes);

    return {
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        
      };
    }



  const divStyle = {
    backgroundImage: `url(${dealImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '600px', // Set the height as needed
    // Add other styles as needed
  };

  const squareStyle = {
    width: '90px',
    height: '100px',
    flexShrink: 0,
    background: 'var(--Color-Secondary-White, #FFF)',
    margin: '10px', // Adjust margin as needed
  };

  const textStyle = {
    color: 'var(--Color-Primary-Dark-Brown, #34251F)',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    textTransform: 'capitalize',
    display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
  };

  const squareContentStyle = {
    color: 'var(--Color-Primary-Dark-Brown, #34251F)',
  fontFamily: 'Inter',
  fontSize: '42px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  textTransform: 'capitalize',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '15px'
    
  };


  return (
    <div style={divStyle}>
      <h1 style={{
    fontFamily: 'Frank Ruhl Libre',
    fontSize: '48px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    textTransform: 'capitalize',
    marginLeft: '7%', 
    paddingTop: '10%'
  }}>Deal of The Day</h1>

<p style={{
    color: 'var(--Color-Primary-Dark-Brown, #34251F)',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '180%',
    textTransform: 'capitalize',
    marginLeft: '7%', 
    paddingTop: '15px'
  }}>
       Elevate your hydration game with our eco-friendly water bottles.
     
    </p>
    <p style={{
    color: 'var(--Color-Primary-Dark-Brown, #34251F)',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '180%',
    textTransform: 'capitalize',
    marginLeft: '7%', 
    
  }}>
      Sip sustainably, stay stylish.
     
    </p>


    <div style={{
    display: 'flex',
    alignItems: 'center', marginLeft: '7%', 
    paddingTop: '20px'
  }}>
        {/* Three square elements in a horizontal line */}
        <div style={squareStyle}><div style={squareContentStyle}>{remainingTime.days}</div>
          <div style={textStyle}>Days</div></div>
        <div style={squareStyle}><div style={squareContentStyle}>{remainingTime.hours}</div>
          <div style={textStyle}>Hours</div></div>
        <div style={squareStyle}><div style={squareContentStyle}>{remainingTime.minutes}</div>
          <div style={textStyle}>Minutes</div></div>
      </div>


      <div ><LinkContainer to='/product' style={{
  display: 'flex',
  height: '45px',
  paddingTop: '30px',
  paddingBottom: '30px',
  paddingLeft: '45px',
  paddingRight: '45px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '14px',
  border: 'var(--Color-Primary-Dark-Brown, #34251F)',
  background: 'var(--Color-Primary-Dark-Brown, #34251F)',
  color: 'var(--Color-Secondary-White, #FFF)',
  fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
    marginLeft: '7.7%',
    marginTop: '25px',
    width: '200px'
    
}}><Nav.Link>
                    Shop Now
                  </Nav.Link></LinkContainer></div>
      </div>
   
  );
};

export default AboutUsSecondComp;
