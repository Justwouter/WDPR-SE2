
import React, {useState, useEffect}from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation} from 'react-router-dom';
import ProgrammaLijst from '../ProgrammaLijst';



const BetalingsForm = (props) => {

    const { state } = useLocation(); 
    
    const mijnKaarten = state.sGStoelen.reduce((result , item) => {
        return `${result}${item},`
      }, "");
  
    const mijnKaartenUrl = state.sGStoelen.reduce((result, item) => {
        return `${result}k=${item}&`
      }, "")
    
    const [Order, setGast] = useState(() => {
      return {
        naam: props.Order ? props.Order.naam : '',
        email: props.Order ? props.Order.email : '',
        betalingNr: props.Order ? props.Order.betalingNr : JSON.stringify(Date.now()),
        kaart: props.Order ? props.Order.kaart : mijnKaarten.slice(0,-1)
   
      };
    });
  
    const {  naam, email, betalingNr } = Order;
    
    const handleSubmit = (event) => {
      event.preventDefault();
     
      const Order = {
        naam,
        email,
        betalingNr,
        kaart: mijnKaarten.slice(0,-1)
      };
      localStorage.setItem("bnr", betalingNr)
      handleOnSubmit(Order);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setGast((prevState) => ({
        ...prevState,
        [name]: value,
        
      }));
    }

    useEffect(() => {
     
      async function updatePost() {
          const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: 'Kaartjes verstuurd' })
          };
          await fetch('http://api.localhost/api/Programma/Stoel/Update?'+ mijnKaartenUrl.slice(0,-1), requestOptions);
      }
      updatePost();
  }, [mijnKaartenUrl]);


  var details = {
    'amount': state.sGStoelen.length * 25,
    'reference': betalingNr,
    'url': 'http://api.localhost/api/Betaling'
  };
  
  
  
  var formBody = [];
  for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
const [ html, setHTML ] = useState();
let code = `${html}`;

const handleOnSubmit = async (Order) => {
    

    await fetch('http://api.localhost/api/Order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      
      }, body: JSON.stringify(Order),
    })

    await fetch('https://fakepay.azurewebsites.net/', {
      method: 'POST',
      headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'},
      body: formBody
      }) 
        .then(response => {
        
        return response.text();
      }).then(res => {
        setHTML(res)
      })
    }


    if(html === undefined && state?.sGStoelen != null){
    return(
      <div className='main-form'>
      <div className='vTitel'>Gegevens</div>
      <div className='BG_Box'>
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
        <Form.Label>Kaartjes: {mijnKaarten.slice(0,-1)}</Form.Label><br></br>
        <Form.Label>Kosten: {state.sGStoelen.length * 25} </Form.Label>
        
        <br></br><br></br>
        <div className='fButton'><div>
        <Button type="submit" className="submit-btn" >Betaal</Button> 
        </div></div>
      </Form>
    </div></div>
            {/* HET IS 8:00 AAAAAAAAAAAAAAAAAAAAAAAH */}
            
        </div>
    )}else if(state?.sGStoelen == null){
        return(<ProgrammaLijst/>)
    }
    else{
      return(
       
        <div
         dangerouslySetInnerHTML = {{__html: (code)}} /> 
        )
    }
    
}

export default   BetalingsForm;