import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { FaTimes } from 'react-icons/fa';
import { Table, Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import '../../assests/styles/admin/CardComponent4.css'


const CardComponent4 = () => {
    const { data: orders } = useGetOrdersQuery();
    const navigate = useNavigate();
    const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) : [];

    const top5Orders = sortedOrders.slice(0, 5);
  
  
  return (
    <Row>
      <Col md={12}>
        <div className="card_component4_scrollableContainer">

          <h2 className="card_component4_latestOrdersTitle">Latest Orders</h2>
          <div>
            <Table hover responsive className='table-sm'>
              <thead>
                <tr className="card_component4_tableRowStyle">
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Total Price</th>
                  <th>Paid At</th>
                  <th>Dispatched At</th>
                  <th>Delivered At</th>
                </tr>
              </thead>
              <tbody>
                {top5Orders.map((order) => (
                  <tr key={order._id} className="card_component4_tableRowStyle_value">
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>Rs {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      {order.isOutForShipping ? (
                        order.outForShippingAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button
              type='button'
              className="card_component4_buttonStyle"
              onMouseOver={(e) => (e.target.style.background = '#141718')}
              onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
              onClick={() => navigate('/admin/orderlist')}
            >
              More <FaArrowRightLong style={{ marginLeft: '7px' }} />
            </Button>
          </div>

        </div>
      </Col>
    </Row>  
  );
}

export default CardComponent4;
