import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import '../../assests/styles/admin/CardComponent.css'

const CardComponent = () => {
  const { data: orders } = useGetOrdersQuery();
  const totalOrders = orders ? orders.length : 0;
  const totalPaidOrders = orders
    ? orders.reduce((accumulator, order) => (order.isPaid ? accumulator + order.totalPrice : accumulator), 0)
    : 0;

  const { pageNumber } = useParams();
  const { data } = useGetProductsQuery({
    pageNumber,
  });
  const totalProducts = data ? data.products.length : 0;
  const { data: users } = useGetUsersQuery();
  const totalUsers = users ? users.length : 0;

  return (
    <Row>
      <Col sm={12} md={6} lg={4} xl={3}>
        <div className="myContainer-card-component">
          <Card.Body>
            <Card.Title as='div' className='product-title'>
              <h2 className="myHeading-card-component">Revenue</h2>
            </Card.Title>
            <Card.Text as='div'></Card.Text>
            <Card.Text className="myCardText-card-component">Rs {totalPaidOrders}</Card.Text>
          </Card.Body>
        </div>
      </Col>

      <Col sm={12} md={6} lg={4} xl={3}>
        <div className="myContainer-card-component">
          <Card.Body>
            <Card.Title as='div' className='product-title'>
              <h2 className="myHeading-card-component">Orders</h2>
            </Card.Title>
            <Card.Text className="myCardText-card-component">{totalOrders}</Card.Text>
          </Card.Body>
        </div>
      </Col>

      <Col sm={12} md={6} lg={4} xl={3}>
        <div className="myContainer-card-component">
          <Card.Body>
            <Card.Title as='div' className='product-title'>
              <h2 className="myHeading-card-component">Visitors</h2>
            </Card.Title>
            <Card.Text as='div'></Card.Text>
            <Card.Text className="myCardText-card-component">{totalUsers - 1}</Card.Text>
          </Card.Body>
        </div>
      </Col>

      <Col sm={12} md={6} lg={4} xl={3}>
        <div className="myContainer-card-component">
          <Card.Body>
            <Card.Title as='div' className='product-title'>
              <h2 className="myHeading-card-component">Products</h2>
            </Card.Title>
            <Card.Text as='div'></Card.Text>
            <Card.Text className="myCardText-card-component">{totalProducts}</Card.Text>
          </Card.Body>
        </div>
      </Col>
    </Row>
  );
}

export default CardComponent;
