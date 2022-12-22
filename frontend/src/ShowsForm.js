import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const ShowForm = (props) => {
    const [Show, setShow] = useState(() => {
      return {
        titel: props.Show ? props.Show.titel : '',
        datum: props.Show ? props.Show.datum : '',
        };
    });
  
    const { titel, datum } = Show;
    
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const Show = {
        titel,
        datum
      };
      props.handleOnSubmit(Show);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setShow((prevState) => ({
        ...prevState,
        [name]: value
        
      }));
    }


return (
    <div className="main-form">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="titel">
          <Form.Label>Titel</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="titel"
            value={titel}
            placeholder="Titel: "
            onChange={handleInputChange}
          
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="datum">
          <Form.Label>datum </Form.Label>
          <Form.Control
            className="input-control"
            type="datetime-local"
            name="datum"
            value={datum}
            placeholder="Datum: "
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn" >
          Shows toevoegen
        </Button>
      </Form>
    </div>
  );

};

export default ShowForm;