import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { FaArrowRightLong } from "react-icons/fa6";
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import '../../assests/styles/admin/CardComponent2.css';

const CardComponent2 = () => {
   
    const navigate = useNavigate();
    const { pageNumber } = useParams();
    const { data } = useGetProductsQuery({
      pageNumber,
    });
   
    const recentProducts = data
    ? data.products
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : [];



    const { data: orders } = useGetOrdersQuery();
    const productCountMap = new Map();

    if (orders) {
      orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          const productId = item.product;
          const qty = item.qty;
          const img = item.image;
          
          const name = item.name;
        const price = item.price;
          if (productCountMap.has(productId)) {
            const existingEntry = productCountMap.get(productId);
            productCountMap.set(productId, {
              occurrences: existingEntry.occurrences + 1,
              totalQty: existingEntry.totalQty + qty,
              img: existingEntry.img, 
              name: existingEntry.name, 
              price: existingEntry.price,
            });
          } else {
            productCountMap.set(productId, {
              occurrences: 1,
              totalQty: qty,
              img,
              name,
              price,
            });
          }
        });
      });
    }
    
  
   
    const sortedProducts = [...productCountMap.entries()].sort(
      (a, b) => b[1].occurrences * b[1].totalQty - a[1].occurrences * a[1].totalQty
    );

    const top3Products = sortedProducts.slice(0, 3);


  return (
    <Row>
      <Col md={6}>
        <div className="card_component2-container-div">
          <ListGroup variant='flush'></ListGroup>
          <h2 className="card_component2-myHeading">
            {recentProducts.length > 0 ? 'New Arrivals' : 'All Products'}
          </h2>
          <ListGroup variant='flush'>
            {(recentProducts.length > 0 ? recentProducts : data?.products)?.map((product) => (
              <ListGroup.Item key={product._id}>
                <Row>
                  <Col md={3}>
                    <Image src={product.image} alt={product.name} fluid rounded />
                  </Col>
                  <Col md={1}></Col>
                  <Col>
                    <Link
                      to={`/product/${product._id}`}
                      className="card_component2-myLink"
                      onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
                      onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}
                    >
                      {product.name}
                    </Link>
                    <p className="card_component2-productCategory">{product.category}</p>
                  </Col>
                  <Col md={1}></Col>
                  <Col>
                    <p className="card_component2-productPrice">Rs {product.price}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <Button
              type='button'
              className="card_component2-Button"
              onMouseOver={(e) => (e.target.style.background = '#141718')}
              onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
              onClick={() => navigate('/admin/productlist')}
            >
              More <FaArrowRightLong style={{ marginLeft: '7px' }} />
            </Button>
          </ListGroup>
        </div>
      </Col>

      <Col md={6}>
        <div className="card_component2-container-div">
          <ListGroup variant='flush'></ListGroup>
          <h2 className="card_component2-myHeading">Bestsellers</h2>
          <ListGroup variant='flush'>
            {top3Products.map(([productId, { occurrences, totalQty, img, name, price }]) => (
              <ListGroup.Item key={productId}>
                <Row>
                  <Col md={3}>
                    <Image src={img} alt={name} fluid rounded />
                  </Col>
                  <Col md={1}></Col>
                  <Col>
                    <Link
                      to={`/product/${productId}`}
                      className="card_component2-myLink"
                      onMouseOver={(e) => (e.target.style.color = 'var(--PINK, #D994BC)')}
                      onMouseOut={(e) => (e.target.style.color = 'var(--blacking, #141108)')}
                    >
                      {name}
                    </Link>
                    <p className="totalQtyText">TOTAL QTY: {totalQty}</p>
                  </Col>
                  <Col md={1}></Col>
                  <Col>
                    <p className="card_component2-productPrice">Rs {price}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <Button
              type='button'
              className="card_component2-Button"
              onMouseOver={(e) => (e.target.style.background = '#141718')}
              onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
              onClick={() => navigate('/admin/productlist')}
            >
              More <FaArrowRightLong style={{ marginLeft: '7px' }} />
            </Button>
          </ListGroup>
        </div>
      </Col>
    </Row>
  );
}

export default CardComponent2;
