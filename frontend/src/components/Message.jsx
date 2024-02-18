import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  const messageStyle = {
    border: `2px solid var(--PINK, #D994BC)`,
    color: 'var(--PINK, #D994BC)', 
    textAlign: 'center',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Inter',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '12px',
    letterSpacing: '-0.4px',
  };


  return (
    <Alert variant={variant} style={messageStyle}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
