import React, {useState, useEffect} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import axios from 'axios'

function Hi() {

  const [price, setPrice] = useState([])

  let search = window.location.search;
  let params = new URLSearchParams(search);
  const hotel_id = params.get('hotel_id');
  const dest_id = params.get('destination_id');
  const checkin = params.get('checkin');
  const checkout = params.get('checkout');
  const lang = params.get('lang');
  const currency = params.get('currency');
  const guests = params.get("guests");

  console.log(hotel_id)
  console.log(dest_id)
  console.log(checkin)
  console.log(checkout)
  console.log(lang)
  console.log(currency)
  console.log(guests)

  const [link, setLink] = useState(`hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`);

  useEffect(() => {
    let link = `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`;
    setLink(link);
  }, [hotel_id, dest_id, checkin, checkout, lang, currency, guests])

  useEffect(() => {
    //let link = "hotels?destination_id=WD0M"
    //let link = `hotels/${hotel_id}/price?destination_id=${dest_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&partner_id=16&country_code=SG&guests=${guests}`
     const data = axios.get(link).then(response => {setPrice(response.data)})
  },[link])

  console.log(price)
  
    return (
      <div>
        <h1>Mock of feature 3</h1>
        <p>hello {hotel_id}!</p>
      </div>
    );
  }
  export default Hi;
  