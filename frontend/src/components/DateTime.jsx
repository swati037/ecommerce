import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const YourComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    margin: '5px',
  };

  const formatDate = (date) => {
    return format(date, 'MMMM d, yyyy h:mm aa');
  };

  return (
    <div>
      <div>
        <label>Date & Time: </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          showTimeInputButton
          timeInputLabel="Time:"
          timeFormat="hh:mm aa"
          injectTimes={[new Date()]}
          style={inputStyle}
        />
      </div>

      <div>
        <label>Phone Number: </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter your phone number"
          style={inputStyle}
        />
      </div>

      <p>Selected Date & Time: {formatDate(selectedDate)}</p>
      <p>Entered Phone Number: {phoneNumber}</p>
    </div>
  );
};

export default YourComponent;
