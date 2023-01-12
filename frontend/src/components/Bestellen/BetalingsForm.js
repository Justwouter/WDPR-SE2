import React, {useState}from 'react';
import { Button, Form } from 'react-bootstrap';

const BetalingsForm = (props) => {

 
    const [Gast, setGast] = useState(() => {
      return {
        gNaam: props.Gast ? props.Gast.gNaam : '',
        gANaam: props.Gast ? props.Gast.gANaam : '',
        gMail: props.Gast ? props.Gast.gMail : '',
        order: props.Gast ? props.Gast.order : ''
   
      };
    });
  
    const {  gNaam, gANaam, gMail, order } = Gast;
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const Gast = {
        gNaam: gNaam + gANaam,
        gANaam,
        gMail,
        order
    
      };
      props.handleOnSubmit(Gast);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setGast((prevState) => ({
        ...prevState,
        [name]: value,
        
      }));
    }

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
           <div className="gastInfo-form">
      <div className='gGegevens'>Gegevens: </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="gNaam">
          <Form.Label>Voornaam: </Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="gNaam"
            value={gNaam}
            placeholder={"Voornaam"}
            onChange={handleInputChange}
          
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="gAchternaam">
          <Form.Label>Achternaam: </Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="gANaam"
            value={gANaam}
            placeholder="Achternaam"
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="gEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="gMail"
            value={gMail}
            placeholder="Email"
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Label>Kaartjes: </Form.Label>
        <Form.Label>Kosten: </Form.Label>
        
        <Button type="submit" className="submit-btn" onClick={handleOnSubmit}>Betaal</Button> 
       
      </Form>
    </div>
            {/* HET IS 8:00 AAAAAAAAAAAAAAAAAAAAAAAH */}
            
        </div>
    )}else{
        return (
            <div dangerouslySetInnerHTML = {{__html: code}} />);
    }
}


export default   BetalingsForm;