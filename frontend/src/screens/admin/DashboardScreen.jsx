import React from 'react';
import SideNavBar from './SideNavBar';
import CardComponent from './CardComponent';
import CardComponent2 from './CardComponent2';
import CardComponent3 from './CardComponent3';
import CardComponent4 from './CardComponent4';
import { Row } from 'react-bootstrap';

function DashboradScreen() {
  return (
    <>
      <div>
        <h1 style={{
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
          paddingBottom: '40px',
          marginLeft: '98px',
        }}>
          Admin Dashboard
        </h1>

        <Row>
          <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
            <CardComponent />
          </div>
        </Row>

        <Row>
          <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
            <CardComponent2 />
          </div>
        </Row>

        <Row>
          <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px', width: '70%' }}>
            <CardComponent3 />
          </div>
        </Row>

        <Row>
          <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px', width: '70%' }}>
            <CardComponent4 />
          </div>
        </Row>
      </div>

      <SideNavBar style={{ order: 2, flex: '0 0 auto' }} />
    </>
  );
}

export default DashboradScreen;
