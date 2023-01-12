import React, {useState}from 'react';
import { Button } from 'react-bootstrap';

const BetalingsForm = () => {

    //TEST
var details = {
  'amount': '30',
  'reference': '1',
  'url': 'http://google.nl'
};

const [ html, setHTML ] = useState();
let code = `${html}`;

var formBody = [];
for (var property in details) {
var encodedKey = encodeURIComponent(property);
var encodedValue = encodeURIComponent(details[property]);
formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const handleOnSubmit = async () => {
    await fetch('https://fakepay.azurewebsites.net/', {
      method: 'POST',
      headers: {
          'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'},
      body: formBody
      }) 
        .then(response => {
        return response.text()
      })
        .then(response => {
        return setHTML(response)
      })
    }
    if(html === undefined){
    return(
        <div>
            {/* HET IS 8:00 AAAAAAAAAAAAAAAAAAAAAAAH */}
            <Button onClick={handleOnSubmit}>Betaal</Button> 
        </div>
    )}else{
        return (
            <div dangerouslySetInnerHTML = {{__html: code}} />);
    }
}


export default   BetalingsForm;