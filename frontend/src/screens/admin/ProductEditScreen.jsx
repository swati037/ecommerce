import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import SideNavBar from './SideNavBar';
import '../../assests/styles/admin/ProductEditScreen.css'


const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        image,
        category,
        description,
        price,
        discountPercentage,
        countInStock,
        
        
      }).unwrap(); 
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setDiscountPercentage(product.discountPercentage);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
        <FormContainer>
          <h1 className="editProductHeading-admin">Edit Product</h1>

          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <div className="flexContainer-admin">
                <Form.Group controlId='name'>
                  <Form.Label className="labelStyle-admin-heading">Product Name</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='name'
                    placeholder='Enter Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label className="labelStyle-admin-heading">Image</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='text'
                    placeholder='Enter Image URL'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    className="styleChooseFile-admin"
                    label='Choose File'
                    onChange={uploadFileHandler}
                    type='file'
                  ></Form.Control>
                  {loadingUpload && <Loader />}
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label className="labelStyle-admin-heading">Category</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='text'
                    placeholder='Enter Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label className="labelStyle-admin-heading">Price</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='number'
                    placeholder='Enter Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='discountPercentage'>
                  <Form.Label className="labelStyle-admin-heading">Discount Percentage</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='number'
                    placeholder='Enter Discount Percentage'
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label className="labelStyle-admin-heading">Count In Stock</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='number'
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label className="labelStyle-admin-heading">Description</Form.Label>
                  <Form.Control
                    className="controlStyle-admin-headingBox"
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  className="buttonStyle-admin-productEdit"
                  onMouseOver={(e) => (e.target.style.background = '#141718')}
                  onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                  type='submit'
                  variant='primary'
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </FormContainer>
      </div>
      <SideNavBar style={{ order: 2, flex: '0 0 auto' }} />
    </>
  );
};

export default ProductEditScreen;
