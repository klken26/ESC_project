import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'; 

function ChooseDate (){
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
    return (
      <DatePicker
        selectsRange = {true}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate = {new Date()}
        dateFormat="dd/MM/yy" 
        placeholderText="date-picker"
      />
    );
  };

test('Datepicker is working', async() => {
    render(<ChooseDate/>);
    const inputNode = screen.getByPlaceholderText("date-picker");
    userEvent.type(inputNode, "20/07/22 - 04/08/22");
    expect(inputNode).toHaveValue("20/07/22 - 04/08/22");

});
