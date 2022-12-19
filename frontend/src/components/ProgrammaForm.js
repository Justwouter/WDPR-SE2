import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProgrammaForm = (props) => {
    const [Programma, setProgramma] = useState(() => {
      return {
        titel: props.Programma ? props.Programma.titel : '',
        van: props.Programma ? props.Programma.van : '',
        tot: props.Programma ? props.Programma.tot : '',
        descriptie: props.Programma ? props.Programma.descriptie : ''
        //LEDENLIJST + ZAAL later
      };
    });
  
    const { titel, van, tot, descriptie } = Programma;
    
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const Programma = {
        titel,
        van,
        tot,
        descriptie
      };
      props.handleOnSubmit(Programma);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProgramma((prevState) => ({
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
        <Form.Group controlId="van">
          <Form.Label>Begintijd </Form.Label>
          <Form.Control
            className="input-control"
            type="datetime-local"
            name="van"
            value={van}
            placeholder="Begintijd: "
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="tot">
          <Form.Label>Aantal mensen</Form.Label>
          <Form.Control
            
            className="input-control"
            type="datetime-local"
            name="tot"
            value={tot}
            placeholder="Eindtijd: "
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>

        <Form.Group controlId="descriptie">
          <Form.Label>Descriptie</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="descriptie"
            value={descriptie}
            placeholder="descriptie: "
            onChange={handleInputChange}
          
          />
          <br></br>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn" >
          Programma toevoegen
        </Button>
      </Form>
    </div>
  );

};

export default ProgrammaForm;