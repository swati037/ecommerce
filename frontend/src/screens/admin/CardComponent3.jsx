import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { FaTimes } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import '../../assests/styles/admin/CardComponent3.css'

function CardComponent3() {
    const { data: orders } = useGetOrdersQuery();
    const filteredOrders = orders ? orders.filter(order => (!order.isOutForShipping && order.isPaid)) : [];
    const sortedOrders = filteredOrders.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const top5LatestOrders = sortedOrders.slice(0, 5);

    const outForShippingNotDeliveredOrders = orders
      ? orders.filter(order => order.isOutForShipping && !order.isDelivered)
      : [];

    const sortedOrders1 = outForShippingNotDeliveredOrders.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const top5OutForShippingNotDeliveredOrders = sortedOrders1.slice(0, 5);


  return (
    <Row>
      <Col md={6}>
        <div className="card_component3_Container">
          <h2 className="card_component3_dispatchHeading">Yet to Dispatch</h2>
          <div>
            <Table hover responsive className='table-sm'>
              <thead>
                <tr className="card_component3_tableRow">
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Total Price</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {top5LatestOrders.map(order => (
                  <tr key={order._id} className="card_component3_tableValue">
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Col>

      <Col md={6}>
        <div className="card_component3_Container">
          <h2 className="card_component3_dispatchHeading">Yet to Deliver</h2>
          <div>
            <Table hover responsive className='table-sm'>
              <thead>
                <tr className="card_component3_tableRow">
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Total Price</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {top5OutForShippingNotDeliveredOrders.map(order => (
                  <tr key={order._id} className="card_component3_tableValue">
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default CardComponent3;
