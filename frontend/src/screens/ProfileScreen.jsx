import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import '../assests/styles/screens/ProfileScreen.css'


const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div style={{ order: 1, flex: '1', marginLeft: '98px', marginRight: '10px' }}>
        <Row>
          <h1 className="profile-screen-h1">Your Account</h1>

          <Col md={3}></Col>
          <Col md={6}>
            <div className="profile-screen-div">
              <h2 className="profile-screen-h2">User Profile</h2>

              <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                  <Form.Label className="profile-screen-form-label">Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="profile-screen-input-style"
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                  <Form.Label className="profile-screen-form-label">Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="profile-screen-input-style"
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                  <Form.Label className="profile-screen-form-label">Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="profile-screen-input-style"
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                  <Form.Label className="profile-screen-form-label">Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="profile-screen-input-style"
                  ></Form.Control>
                </Form.Group>

                <Button
                  type='submit'
                  variant='primary'
                  className="profile-screen-button-style"
                  onMouseOver={(e) => (e.target.style.background = '#141718')}
                  onMouseOut={(e) => (e.target.style.background = 'var(--PINK, #D994BC)')}
                >
                  Update
                </Button>
                {loadingUpdateProfile && <Loader />}
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileScreen;
