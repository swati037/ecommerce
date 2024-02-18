import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import SideNavBar from './SideNavBar';
import '../../assests/styles/admin/UserEditScreen.css'


const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
        <div>
          <FormContainer>
            <h1 className="editUserHeading-admin">Edit User</h1>
    
            {loadingUpdate && <Loader />}
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <div className="divComponentContainer-admin">
                  <Form.Group className='my-2' controlId='name'>
                    <Form.Label className="formLabel-admin">Name</Form.Label>
                    <Form.Control
                      className="formLabel-ComponentWrapper-admin"
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
    
                  <Form.Group className='my-2' controlId='email'>
                    <Form.Label className="formLabel-admin">Email Address</Form.Label>
                    <Form.Control
                      className="formLabel-ComponentWrapper-admin"
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
    
                  <Form.Group className='my-2' controlId='isadmin'>
                    <Form.Check
                      type='checkbox'
                      label='Is Admin'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="editTextStyle-admin"
                    ></Form.Check>
                  </Form.Group>
    
                  <Button
                    type='submit'
                    variant='primary'
                    className="userEdit-ButtonStyle-admin"
                    onMouseOver={(e) => (e.target.style.background = '#141718')}
                    onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                  >
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </FormContainer>
        </div>
        <SideNavBar style={{ order: 2, flex: '0 0 auto' }} />
      </div>
    </>
  );
};

export default UserEditScreen;
