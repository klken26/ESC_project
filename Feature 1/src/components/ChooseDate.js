import React, { Component } from 'react';  
import DatePicker from 'react-datepicker'; 
import {useState} from 'react';
   
import "react-datepicker/dist/react-datepicker.css";  
import 'bootstrap/dist/css/bootstrap.min.css';  

function ChooseDate (){
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
    
    return {
        startDate, endDate,
    renderDate: (
      <DatePicker
        selectsRange = {true}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate = {new Date()}
        dateFormat="dd/MM/yy" 
      />
    )}
  };


export default ChooseDate;