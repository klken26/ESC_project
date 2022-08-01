import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChooseDate(props) {
  const {
    setStartDateHandler,
    setEndDateHandler,
    startDate,
    endDate,
    formErrors,
  } = props;
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDateHandler(start);
    setEndDateHandler(end);
  };

  return (
    <div>
      <DatePicker
        selectsRange={true}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat="dd/MM/yy"
      />
      <p className="errors">{formErrors.stayPeriod}</p>
      <p className="errors">{formErrors.endDate}</p>
    </div>
  );
}

export default ChooseDate;
