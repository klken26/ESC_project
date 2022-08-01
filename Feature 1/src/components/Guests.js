import React, { useState } from "react";

function Guests(props) {
  const {
    setAdultHandler,
    setChildrenHandler,
    setRoomHandler,
    room,
    children,
    adult,
    formErrors,
  } = props;

  const handleChangeAdult = (event) => {
    //match all non digit chars to empty string
    setAdultHandler(event.target.value.replace(/\D/g, ""));
  };
  const handleChangeChildren = (event) => {
    setChildrenHandler(event.target.value.replace(/\D/g, ""));
  };
  const handleChangeRoom = (event) => {
    setRoomHandler(event.target.value.replace(/\D/g, ""));
  };
  // const handleValidateChangeRoom = (event) => {
  //   const re = /^[0-9\b]+$/;
  //       if (event.target.value === "" || re.test(event.target.value)) {
  //         handleChangeRoom(event)
  //       }
  //   }

  return (
    <div className="outerbox">
      <label htmlFor="rooms" className="labels">
        Rooms
      </label>
      <input
        id="rooms"
        type="int"
        className="boxesroom"
        onChange={handleChangeRoom}
        value={room}
      />
      <br />
      <p className="errors">{formErrors.room}</p>
      <div>
        <label htmlFor="adults" className="labels-adult">
          Adults
        </label>
        <input
          id="adults"
          type="int"
          className="boxesadult"
          onChange={handleChangeAdult}
          value={adult}
        />
        <br />
        <p className="errors">{formErrors.adult}</p>
        {/* {state.adults} */}
      </div>
      <div>
        <label htmlFor="children" className="labels">
          Children
        </label>
        <input
          id="children"
          type="int"
          className="boxes"
          onChange={handleChangeChildren}
          value={children}
        />
        <br />
        {/* {state.children} */}
      </div>
    </div>
  );
}
export default Guests;
