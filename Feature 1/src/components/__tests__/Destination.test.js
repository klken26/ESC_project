import { fireEvent, getByLabelText, getByTestId, getByText, queryByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useState,useEffect} from 'react';
import axios from "axios";
import { wait } from '@testing-library/user-event/dist/utils';
function Destinations() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `destinations.json`
          );
          setData(response.data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);
  
  
      const dest = data && data.length>0 && data.map((item)=>item.term);
  
      const destinations = dest
      return (
        <div> 
        <p>Please choose your destination</p>
        <Autocomplete
          disablePortal
          //data-testid="destination-autocomplete"
          id="combo-box-demo"
          data-testid= "combo-box-demo" 
          options={destinations}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Destination"  />}
          onChange={(event, value) => {
            if (value == null) {
                value = "";
            }
            setValue(value)}
        }
          
        />
  
        </div>
        
      );
      
  }
  



test('Datepicker is working', async() => {
    render(<Destinations/>);
    //const inputNode = screen.getByTestId("combo-box-demo").querySelector('input');
    const inputNode = screen.getByLabelText("Destination");
    inputNode.focus();
    //userEvent.type(inputNode, "Rome, Italy");
    fireEvent.change(inputNode, { target: { value: "Rome, Italy" } });
    await wait();
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
    await wait();
    //fireEvent.keyPress(inputNode, { code: 'Enter' });
    fireEvent.keyDown(inputNode, {key: 'Enter', code: 'Enter', charCode: 13})
    await wait();
    expect(inputNode.textContent).toEqual("Rome, Italy");
    //expect(getByLabelText("Destination", { selector: "input" }).textContent).toEqual("Rome, Italy");
    //expect(queryByText("Rome, Italy")).toBeInTheDocument();
});
