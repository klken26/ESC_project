import * as React from 'react';
import Destinations from './components/Destinations';
import Guests from './components/Guests';
import ChooseDate from './components/ChooseDate';
import "./App.css";
import {useState} from 'react';


export default function App() {
const {render, value} = Destinations();
const {renderDate, startDate, endDate} = ChooseDate();
const {renderGuest,adult, children, room} = Guests();
const [errors, setError] = useState(null);
const [isSubmitted, setIsSubmitted] = useState(false);



function handleSubmit(e) {
  e.preventDefault();
  // console.log(value);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(adult, children, room);
  //alert("Processing request")
  // if (handleValidation()) {
  //   alert("Form submitted");
  //   alert(value);
  // } else {
  //   alert("Form has errors");
  // }
}
document.body.style.background = '#bbd1ea';
return (
  <div>
  <div className="content">
      <div className='contain'>
        <div className='destination'>{render}
        </div>
            <div className='guest'>{renderGuest}</div>
            <div className='parent-flex'>
            <p>Please enter stay period: </p>
            <div className='calendar'>{renderDate}</div>

        </div>
        <form onSubmit={handleSubmit}>
          <button className ='search' type="submit">Search</button>
         </form>
      </div>
  </div>
  </div>
);
  
}