import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';

const ShowsForm = (props) => {
    const [Show, setShow] = useState(() => {
      return {
        name: props.Show ? props.Show.name : '',
        startDate: props.Show ? props.Show.startDate : '',
        endDate: props.Show ? props.Show.endDate : '',
        description: props.Show ? props.Show.description : ''
        };
    });
  
    const { name, startDate, endDate, description } = Show;
    
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const Show = {
        name,
        startDate,
        endDate,
        description
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
        <Form.Group controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="name"
            value={name}
            placeholder="Titel: "
            onChange={handleInputChange}
          
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>datum </Form.Label>
          <Form.Control
            className="input-control"
            type="datetime-local"
            name="startDate"
            value={startDate}
            placeholder="Datum: "
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>einddatum</Form.Label>
          <Form.Control
            className="input-control"
            type="datetime-local"
            name="endDate"
            value={endDate}
            placeholder="einddatum: "
            onChange={handleInputChange}
          
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            className="input-control"
            type="String"
            name="description"
            value={description}
            placeholder="Omschrijving: "
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

export default ShowsForm;