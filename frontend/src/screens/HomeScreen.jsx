import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Search from '../components/SearchBox';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div style={{ marginTop: '50px' }}>
      <Row>
        <Col></Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Row>
            <Col md={6} style={{ position: 'relative' }}>
              <h1 style={{
                width: '100%',
                height: '54.316px',
                color: 'var(--black, #141108);',
                fontFeatureSettings: 'clig off, liga off',
                fontFamily: 'Inter',
                fontSize: '40px',
                fontWeight: 500,
                lineHeight: '44px',
                letterSpacing: '-0.4px',
                paddingTop: '40px',
                paddingBottom: '40px',
                paddingLeft: '15px'
              }}>
                Latest Products
              </h1>
            </Col>
            <Col
              md={5}
              xs={12}
              className="ms-auto"
              style={{
                position: 'relative',
                marginTop: '40px',
                marginRight: '20px',
              }}
            >
              <Search />
            </Col>
          </Row>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
