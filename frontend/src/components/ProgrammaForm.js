import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const ProgrammaForm = (props) => {
    const [ StoelenLijst, setStoelenLijst ] = useState([]);
    const [Programma, setProgramma] = useState(() => {
      return {
        // programmaId: props.Programma ? props.Programma.programmaId : '',
        titel: props.Programma ? props.Programma.titel : '',
        van: props.Programma ? props.Programma.van : '',
        tot: props.Programma ? props.Programma.tot : '',
        descriptie: props.Programma ? props.Programma.descriptie : '',
        zaal: props.Programma ? props.Programma.zaal : '',
        stoelenLijst: props.Programma ? props.Programma.stoelenLijst : ''
        //LEDENLIJST + ZAAL later
      };
    });
  
    const {  titel, van, tot, descriptie, zaal,stoelenLijst } = Programma;
    
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const Programma = {
        titel,
        van,
        tot,
        descriptie,
        zaal,
        stoelenLijst
      };
      props.handleOnSubmit(Programma);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProgramma((prevState) => ({
        ...prevState,
        [name]: value,
        
      }));
    }
    const handleInputChangeZ = (event) => {
      const {name, value } = event.target;
      setProgramma((prevState) => ({
        ...prevState,
        [name]:value,
        stoelenLijst: maakStoelenLijst(value)
        
        
      }));
    }

    useEffect(() => {
      async function fetchData(){
          const response = await fetch('http://api.theaterlaak.site:/Zaal');
          const data = await response.json();
          setStoelenLijst(data);
        
      }
      fetchData()
    }, []);

    function maakStoelenLijst(zaal){
      
      var eersteR = StoelenLijst[zaal-1]['eersteR']
      var tweedeR = StoelenLijst[zaal-1]['tweedeR']
      var derdeR = StoelenLijst[zaal-1]['derdeR']
  
  
      let sLijst = []
          for (let i = 1; i <= eersteR; i++) {
            const eRObject = {
              nr : i,
              rang : "A",
              status : false,
            }
            sLijst.push(eRObject)
          }
          for (let i = 1; i <= tweedeR; i++) {
            const tRObject = {
              nr : i,
              rang : "B",
              status : false,
            }
            sLijst.push(tRObject)
          }
          for (let i = 1; i <= derdeR; i++) {
            const dRObject = {
              nr : i,
              rang : "C",
              status : false,
            
            }
            sLijst.push(dRObject)
          }
      
          console.log()
          return sLijst;
          
    }
return (
    <div className="main-form">
      <div className='vTitel'>Programma toevoegen</div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="titel">
          <Form.Label>Titel: </Form.Label>
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
          <Form.Label>Begintijd: </Form.Label>
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
          <Form.Label>Eindtijd: </Form.Label>
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
          <Form.Label>Descriptie: </Form.Label>
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
        <Form.Group controlId="stoelenlijst">
          <Form.Label>Zaal: </Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            min="1"
            max="4"
            name="zaal"
            value={zaal}
            placeholder="Kies zaal 1 t/m 4: "
            
            onChange={handleInputChangeZ}
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