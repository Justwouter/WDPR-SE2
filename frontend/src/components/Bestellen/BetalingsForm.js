import React, {useState, useEffect}from 'react';
import { Button, Form } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

const BetalingsForm = (props) => {

    const { state } = useLocation(); 
    //console.log(state);
    const [Order, setGast] = useState(() => {
      return {
        naam: props.Gast ? props.Gast.naam : '',
        gANaam: props.Gast ? props.Gast.gANaam : '',
        email: props.Gast ? props.Gast.email : '',
        betalingNr: props.Gast ? props.Gast.betalingNr : Date.now()
   
      };
    });
  
    const {  naam, gANaam, email, betalingNr } = Order;
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const Order = {
        naam: naam + gANaam,
        gANaam,
        email,
        betalingNr
    
      };
      handleOnSubmit(Order);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setGast((prevState) => ({
        ...prevState,
        [name]: value,
        
      }));
    }

    //TEST
    const mijnKaarten = state.sGStoelen.reduce((result , item) => {
      return `${result}${state.sID}P${item}SI -`
    }, "")

    const mijnKaartenUrl = state.sGStoelen.reduce((result, item) => {
      return `${result}k=${item}&`
    }, "")

    useEffect(() => {
      // PUT request using fetch with async/await
      async function updatePost() {
          const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: 'Kaartjes verstuurd' })
          };
          await fetch('http://api.localhost/api/Programma/Stoel/Update?'+ mijnKaartenUrl.slice(0, -1), requestOptions);
       
          
      }
  
      updatePost();
  }, [mijnKaartenUrl]);

var details = {
  'amount': state.sGStoelen.length * 25,
  'reference': betalingNr,
  'url': 'http://api.localhost/api/Betaling'
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

const handleOnSubmit = async (order) => {
    await fetch('http://api.localhost/api/Order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      
      }, body: JSON.stringify(order),
    })

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
      <div className='main-form'>
      <div className='vTitel'>Gegevens</div>
      <div className="fBox">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="naam">
          <Form.Label>Voornaam: </Form.Label>
          <Form.Control
            required={true}
            className="veld"
            type="text"
            name="naam"
            value={naam}
            placeholder={"Voornaam"}
            onChange={handleInputChange}
          
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="gAchternaam">
          <Form.Label>Achternaam: </Form.Label>
          <Form.Control
            required={true}
            className="veld"
            type="text"
            name="gANaam"
            value={gANaam}
            placeholder="Achternaam"
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
             required={true}
            className="veld"
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Label>Kaartjes: {mijnKaarten.slice(0, -1)}</Form.Label><br></br>
        <Form.Label>Kosten: {state.sGStoelen.length * 25} </Form.Label>
        
        <br></br><br></br>
        <div className='fButton'><div>
        <Button type="submit" className="submit-btn" >Betaal</Button> 
        </div></div>
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