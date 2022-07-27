import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useState,useEffect} from 'react';
import axios from 'axios';


function Destinations() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);


//   const ref = firebase.firestore().collection("destinations");

//   const onChange = (event, value) => {
//     data.forEach(element => {
//         if (element["term"] === value) {
//             setValue(element["uid"]); // If need other data, change element["uid"] to element
//         }
//     });
//   }

//   function getData() {
//       setLoading(true);
//       ref.onSnapshot((querySnapshot) => {
//           const items = [];
//           querySnapshot.forEach((doc) => {
//               items.push(doc.data());
//           });
//           setData(items);
//           setLoading(false);
//       });
//   }

//   useEffect(() => {
//       getData();
//   }, []);

//  const destinations = data && data.length>0 && data.map((item)=>item.term);
  //console.log(data);

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

    if (loading) {
        return {
            render:(<div>Loading Destinations...</div>)
        }
    }
    return {
        value,
    render:(
      <div> 
      <p>Please choose your destination</p>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={destinations}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Destination" name="DestTest" />}
        onChange={(event, value) => setValue(value)}
        //onChange = {onChange}
      />
      </div>
    )}
    
}

export default Destinations