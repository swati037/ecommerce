import Card from 'react-bootstrap/Card';

function TermsScreen() {
  const cardHeaderStyle = {
    color: 'var(--neutral-04100, #6C7275)',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '12px',
    textTransform: 'uppercase',
    paddingTop: '13px',
    paddingBottom: '13px',
  };
  
  const cardBodyStyle = {
    fontFamily: 'Inter',
    fontSize: '16px',
  };

  const headerStyle = {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '44px',
    letterSpacing: '-0.4px',
    marginBottom: '20px',
    paddingTop: '50px',
    textAlign: 'center',
    paddingBottom: '60px',
  }


  return (
    <> 
      <h1 style={headerStyle}>Terms and Conditions</h1>

      <Card style={{ marginBottom: '30px' }}>
        <Card.Header style={cardHeaderStyle}>1. Acceptance of Terms</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
              By accessing or using the Shachi's website, you agree to comply with and be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, please do not use our Website.
            </p>
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{ marginBottom: '30px' }}>
        <Card.Header style={cardHeaderStyle}>2. Website Use</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
              You agree to provide accurate and current information during the registration process and to update such information to keep it accurate and current.
            </p>
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>3.1 Product Information</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            We strive to provide accurate product information, including images, descriptions, and specifications. However, we do not warrant that product descriptions or other content on the Website are accurate, complete, reliable, current, or error-free.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>3.2 Product Information</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            Prices for products are subject to change without notice. We reserve the right to modify or discontinue any product without notice.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>4.1 Orders and Payments</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            When you place an order through our Website, you agree to provide valid and accurate payment information.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>4.2 Orders and Payments</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            We reserve the right to refuse or cancel your order for any reason, including but not limited to product availability, errors in the description or price of the product, or an error in your order.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>5.1 Shipping and Delivery</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            Shipping and delivery times are estimates and may vary. We are not responsible for any delays or damages during shipping.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>5.2 Shipping and Delivery</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            Risk of loss and title for items purchased from our Website pass to you upon delivery of the items to the carrier.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>6. Returns and Refunds</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            Our return policy is available on the Website. Please review the policy before making a purchase.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>7. User Accounts and Security</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>8. Privacy Policy</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            Please refer to our Privacy Policy for information on how we collect, use, and disclose personal information.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>9. Limitation of Liability</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            To the fullest extent permitted by applicable law, Shachi shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>10. Governing Law</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            These Terms shall be governed by and construed in accordance with the laws of Jurisdiction.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>

      <Card style={{marginBottom: '30px'}}>
        <Card.Header style={cardHeaderStyle}>11. Contact Information</Card.Header>
        <Card.Body style={cardBodyStyle}>
          <blockquote className="blockquote mb-0">
            <p>
            If you have any questions about these Terms, please contact us.
            </p>
          
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
}

export default TermsScreen;