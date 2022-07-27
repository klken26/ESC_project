import React, { useState } from 'react'
import "../App.css";

function Guests() {
    const [adult, setAdult] = useState(null);
    const [children, setChildren] = useState(null);
    const [room, setRoom] = useState(null);
    const handleChangeAdult = (event) => {
      //match all non digit chars to empty string 
        setAdult(event.target.value.replace(/\D/g, ''));
    };
    const handleChangeChildren = (event) => {
      setChildren(event.target.value.replace(/\D/g, ''));
    };
  const handleChangeRoom = (event) => {
    setRoom(event.target.value.replace(/\D/g, ''));
    };
  // const handleValidateChangeRoom = (event) => {
  //   const re = /^[0-9\b]+$/;
  //       if (event.target.value === "" || re.test(event.target.value)) {
  //         handleChangeRoom(event)
  //       }
  //   }

    return {
      adult, children, room,
      renderGuest: (
        <div className='outerbox'>
          <label for="rooms" className='labels'>Rooms</label>
          <input 
                id="rooms" 
                type="int"  
                className='boxesroom' 
                onChange={handleChangeRoom}
                value={room}
                />
          <br/>
          <div>
          <label for="adults" className='labels-adult'>Adults</label>
          <input 
                id="adults" 
                type="int" 
                className='boxesadult' 
                onChange={handleChangeAdult}
                value = {adult}
              />
            <br/>
            {/* {state.adults} */}
            </div>
            <div>
            <label for="children" className='labels'>Children</label>
            <input 
                id="children" 
                type="int"
                className='boxes' 
                onChange={handleChangeChildren}
                value = {children}
                />
            <br/>
            {/* {state.children} */}
            </div>
        </div>
    )}
}
export default Guests;