import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';
import '../assests/styles/components/Product.css';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <div className="product-container product-container-shop-page">
      <div
        className="image-container"
        style={{
          position: 'relative',
          width: '110%',
          borderRadius: '0px',
          overflow: 'hidden',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image product-image-landing"
        />

        {product.discountPercentage > 0 && (
          <div className="discount-badge">{product.discountPercentage}%</div>
        )}

        {product.countInStock > 0 && (
          <div className="row-inside-image row-inside-image-shop-page">
            <Row>
              <Row className="align-items-center">
                <Col md={8} xs={8}>
                  <Button
                    className="btn-block button-style-shop-page"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    onMouseOver={(e) =>
                      (e.target.style.background = 'var(--PINK, #D994BC)')
                    }
                    onMouseOut={(e) =>
                      (e.target.style.background =
                        'var(--neutral-07100, #141718)')
                    }
                  >
                    Add To Cart
                  </Button>
                </Col>
                <Col md={4} xs={4}>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="quantity-style"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </Row>
          </div>
        )}
      </div>

      <Col xs={12} className="product-details" style={{ textAlign: 'left' }}>
        <div className="product-rating">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <div style={{ alignSelf: 'stretch' }}>
          <p
            className="paragraph-landing-style"
            onMouseOver={(e) =>
              (e.target.style.color = 'var(--PINK, #D994BC)')
            }
            onMouseOut={(e) =>
              (e.target.style.color = 'var(--blacking, #141108)')
            }
          >
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
        </div>

        <span className="price-style">
          Rs {product.price - (product.discountPercentage / 100) * product.price}
          {product.discountPercentage > 0 && (
            <span className="strike-through-style">Rs {product.price}</span>
          )}
        </span>
      </Col>
    </div>
  );
};

export default Product;
