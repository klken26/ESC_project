import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'
function Guests() {
    const [adult, setAdult] = useState(null);
    const [children, setChildren] = useState(null);
    const [room, setRoom] = useState(null);
    const handleChangeAdult = (event) => {
        setAdult(event.target.value);
    };
    const handleChangeChildren = (event) => {
      setChildren(event.target.value);
    };
  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
    };

    return (
        <div className='outerbox'>
          <div>
          <label for="rooms" className='labels'>Rooms</label>
          <input 
                id="rooms" 
                type="int"  
                className='boxesroom' 
                onChange={handleChangeRoom}
                value={room}
                />
          </div>
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
            </div>
        </div>
    );
}
test('textboxes in guests working', async() => {
  render(<Guests/>);
  const inputNode = screen.getByLabelText('Rooms');
  userEvent.type(inputNode, "1");
  expect(inputNode).toHaveValue("1");
  const inputNodeA = screen.getByLabelText('Adults')
  userEvent.type(inputNodeA, "1");
  expect(inputNodeA).toHaveValue("1");
  const inputNodeC = screen.getByLabelText('Children')
  userEvent.type(inputNodeC, "1");
  expect(inputNodeC).toHaveValue("1");
});