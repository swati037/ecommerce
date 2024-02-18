import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/product');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex flex-column flex-sm-row align-items-sm-center'>
      <div className='position-relative d-flex flex-grow-1' style={{ width: '69%', marginLeft: '55px', marginBottom: '8px' }}>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder='Search'
          className='mb-2 mb-sm-0'
          style={{
            width: '100%',
            border: '2px solid #D994BC',
            color: '#A5A5A5',
            fontFamily: 'Inter',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '26px',
          }}
        />
        <Button
          type='submit'
          style={{
            padding: '7px 20px',
            borderRadius: '80px',
            background: 'var(--PINK, #D994BC)',
            border: 'none',
            position: 'absolute',
            top: '15%',
            right: '8px',
            marginTop: '-3px',
          }}
        >
          Search Products
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
