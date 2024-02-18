import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import SideNavBar from './SideNavBar';
import '../../assests/styles/admin/ProductListScreen.css'



const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
        <Row className='align-items-center'>
          <h1 className="productDashboardTitle-admin">Product Dashboard</h1>
          
          <Col className='text-end'>
            <Button
              onClick={createProductHandler}
              className="my-3 addProduct-button-admin"
              onMouseOver={(e) => (e.target.style.background = '#141718')}
              onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
            >
              <FaPlus /> Create Product
            </Button>
          </Col>
        </Row>
    
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <>
            <Table bordered hover responsive className='table-sm'>
              <thead>
                <tr className="addProduct-TableRow-admin">
                  <th>PRODUCT ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>DISCOUNT PRICE</th>
                  <th>CATEGORY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product._id} className="addProduct-TableRow-admin-values">
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>Rs {product.price}</td>
                    <td>{product.discountPercentage}%</td>
                    <td>{product.category}</td>
                    
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </>
        )}
      </div>
    
      <SideNavBar style={{ order: 2, flex: '0 0 auto' }} />
    </>
  );
};

export default ProductListScreen;
