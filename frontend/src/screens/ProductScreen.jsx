import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);


  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };
  
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }


  };

  return (
    <div style={{ paddingTop: '60px' }}>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            
          <Col md={5} style={{ position: 'relative' }}>
          <div style={{ marginBottom: '20px' }}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'cover',
                
              }}
            />
            {product.discountPercentage > 0 && (
  <div style={{
    position: 'absolute',
    top: '4px',
    left: '17px',
    background: '#38CB89',
    color: '#fff',
    padding: '4px 13px 4px 13px',
    borderRadius: '5px',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '18px',
  }}>
     {product.discountPercentage}%
  </div>
)}
            </div>
          </Col>




            <Col md={7} style={{ paddingLeft: '30px' }}>
              <ListGroup variant='flush'>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
  <Rating value={product.rating} style={{ marginBottom: '3px' }} />

  <span style={{
    color: 'var(--PINK, #D994BC)',
    fontFamily: 'Inter',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    marginLeft: '5px', // Add margin to separate the rating and reviews
  }}>
    {`${product.numReviews} reviews`}
  </span>
</div>



                
                <h3 style={{
  color: 'var(--blacking, #141108)',
  fontFamily: 'Inter',
  fontSize: '40px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '44px',
  letterSpacing: '-0.4px',
  margin: '0 0 30px 0',
  
}}>
  {product.name}
</h3>

<p style={{
  color: 'var(--neutral-04100, #6C7275)',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '26px',
  margin: '0 0 26px 0', // To reset default margin
}}>
{product.description}
</p>

                
<span style={{
  color: 'var(--Black-900, #121212)',
  fontFamily: 'Inter',
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '34px',
  letterSpacing: '-0.6px',
  margin: '0 0 26px 0',
  
  paddingBottom: '4px',
}}>
  Rs {product.price - ((product.discountPercentage/100)*product.price)}

  <span style={{
    color: 'var(--neutral-04100, #6C7275)',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Inter',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '28px',
    textDecorationLine: 'line-through',
    paddingLeft: '20px',
  }}>Rs {product.price}</span>
</span> 


<span style={{
    borderBottom: '1px solid var(--neutral-03100, #E8ECEF)',
    display: 'block',
    marginTop: '4px', // Add margin to separate the text from the line
  }}></span>

<span style={{
  color: 'var(--neutral-04100, #6C7275)',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '26px',
  paddingTop: '26px',
}}>
  Status:
</span>

<span style={{
  color: '#000',
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '32px',
  paddingTop: '5px',
  paddingBottom: '25px',
}}>
  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
</span>


    
    {product.countInStock > 0 && (
  <Row>
    <Col md={3} style={{
      color: 'var(--neutral-04100, #6C7275)',
      fontFamily: 'Inter',
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
    }}>
      Quantity
    </Col>
    <Col md={5}>
      <Form.Control
        as='select'
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      >
        {[...Array(product.countInStock).keys()].map(
          (x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          )
        )}
      </Form.Control>
    </Col>
  </Row>
)}

<Button
  className='btn-block'
  type='button'
  disabled={product.countInStock === 0}
  onClick={addToCartHandler}
  style={{
    display: 'flex',
    width: '100%', // Set width to 100% for responsiveness
    maxWidth: '478px', // Set a max-width to prevent overly wide buttons
    padding: '10px 20px', // Adjust padding for smaller screens
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '8px',
    background: 'var(--PINK, #D994BC)',
    marginTop: '30px',
    border: 'none',
    fontFeatureSettings: "'clig' off, 'liga' off",
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '28px', /* 175% */
    letterSpacing: '-0.4px',
     marginTop: '35px',
     width: '100%',
     transition: 'background 0.3s',
  }}
  onMouseOver={(e) => (e.target.style.background = '#141718')}
  onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
>
  Add To Cart
</Button>


<span style={{
  borderBottom: '1px solid var(--neutral-03100, #E8ECEF)',
  display: 'block',
  marginTop: '48px', // Add margin above the line
  marginBottom: '30px', // Add margin below the line
}}></span>


<div style={{ display: 'flex', alignItems: 'center' }}>
  <span style={{
    color: 'var(--neutral-04100, #6C7275)',
    fontFamily: 'Inter',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    marginRight: '56px', // Add margin between the spans
  }}>
    CATEGORY
  </span>

  <span style={{
    color: 'var(--PINK, #D994BC)',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  }}>
    {product.category}
  </span>
</div>
              </ListGroup>
            </Col>
          </Row>


          <span style={{
    borderBottom: '1px solid var(--neutral-03100, #E8ECEF)',
    display: 'block',
    marginTop: '34px', // Add margin to separate the text from the line
  }}></span>


          <Row>
            <Col md={12}>
            <h2 style={{
  color: 'var(--Black-900, #121212)',
  fontFeatureSettings: 'normal',
  fontFamily: 'Inter',
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '32px',
  letterSpacing: '-0.4px',
  paddingTop: '50px',
}}>
  Customer Reviews
</h2>

<div style={{ display: 'inline-flex', alignItems: 'center', paddingBottom: '40px' }}>
  <Rating value={product.rating} style={{ marginBottom: '0px' }} />

  <span style={{
    color: 'var(--PINK, #D994BC)',
    fontFamily: 'Inter',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    marginLeft: '5px', // Add margin to separate the rating and reviews
  }}>
    {`${product.numReviews} reviews`}
  </span>
</div>

<ListGroup.Item>
                  

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                      <Form.Label style={{
  color: 'var(--Neutrals-2, #23262F)',
  fontFeatureSettings: 'normal',
  fontFamily: 'Inter',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '34px',
  letterSpacing: '-0.6px',
  paddingTop: '50px',
}}>
</Form.Label>



<div>
      <p>Your Rating:</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          style={{
            cursor: 'pointer',
            color: (star <= rating || star <= hoveredRating) ? '#FFD700' : '#A5A5A5',
            fontSize: '24px',
          }}
        >
          {star <= rating ? <FaStar /> : star <= hoveredRating ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
      ))}
    </div>
{/* <Form.Control
  as='select'
  required
  value={rating}
  onChange={(e) => setRating(e.target.value)}
  style={{
    display: 'flex',
    width: '100%',
    maxWidth: '1120px', // Set a maximum width if needed
    padding: '16px 24px', // Adjust padding as per your design
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '16px',
    border: '2px solid #D994BC',
    background: 'var(--neutral-01100, #FEFEFE)',
    color: '#A5A5A5',
    fontFeatureSettings: 'normal',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '26px',
  }}
>
  <option value=''>Select...</option>
  <option value='1'>1 - Poor</option>
  <option value='2'>2 - Fair</option>
  <option value='3'>3 - Good</option>
  <option value='4'>4 - Very Good</option>
  <option value='5'>5 - Excellent</option>
</Form.Control> */}


                      </Form.Group>
                      {/* <Form.Group controlId='comment'> */}
                        
                      <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control
  as='div'
  style={{
    display: 'flex',
    width: '100%',
    // maxWidth: '1120px',
    padding: '1px 1px 1px 1px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '16px',
    border: '0px solid #D994BC',
    background: 'var(--neutral-01100, #FEFEFE)',
    position: 'relative',
  }}
>
  <Form.Control
    as='textarea'
    rows='1'
    required
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    style={{
      flex: 1,
      border: '2px solid #D994BC',
      resize: 'none',
      outline: 'none',
      color: '#A5A5A5', // Color of the placeholder text
      fontFamily: 'Inter',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '26px',
      
    }}
    placeholder="Share your thoughts..."
  />
  <Button
    disabled={loadingProductReview}
    type='submit'
    variant='primary'
    style={{
      padding: '7px 20px',
      borderRadius: '80px',
      background: 'var(--PINK, #D994BC)',
      border: 'none',
      position: 'absolute',
      top: '50%',
      right: '8px',
      transform: 'translateY(-50%)',
      transition: 'background 0.3s',
    }}
    onMouseOver={(e) => (e.target.style.background = '#141718')}
    onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
   
  >
    Write Review
  </Button>
</Form.Control>


</Form.Group>

<p style={{
  color: '#000',
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: 'Inter',
  fontSize: '25px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '34px',
  letterSpacing: '-0.6px',
  paddingTop: '65px',
  
}}>
  {`${product.numReviews} reviews`}
</p>

</Form>

                  ) : (
                    
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>

                <h2 style={{
  color: 'var(--Black-900, #121212)',
  fontFeatureSettings: 'normal',
  fontFamily: 'Inter',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '32px',
  letterSpacing: '-0.4px',
  paddingTop: '50px',
}}>
  {`${product.numReviews} Reviews`}
</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              {product.reviews.length > 0 && (
  <div className="d-flex justify-content-center">
    <div className="w-100 w-md-75 w-lg-50">
      <div style={{
        flexShrink: 0,
        borderRadius: '16px',
        border: '2px solid #D994BC',
        overflow: 'hidden',
        margin: '20px 0',
        marginTop: '0px'
      }}>
        <ListGroup variant='flush'>
          {product.reviews.map((review, index) => (
            <ListGroup.Item
              key={review._id}
              style={{
                borderBottom: index === product.reviews.length - 1 ? 'none' : '1px solid #D994BC',
                padding: '10px', 
              }}
            >
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  </div>
)}



            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
