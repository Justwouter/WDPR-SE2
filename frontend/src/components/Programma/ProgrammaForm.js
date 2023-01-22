import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const ProgrammaForm = (props) => {
    const [Programma, setProgramma] = useState(() => {
      return {
        titel: props.Programma ? props.Programma.titel : '',
        genre: props.Programma ? props.Programma.genre : 'Cabaret',
        van: props.Programma ? props.Programma.van : '',
        tot: props.Programma ? props.Programma.tot : '',
        descriptie: props.Programma ? props.Programma.descriptie : '',
        zaal: props.Programma ? props.Programma.zaal : '1',
        stoelenLijst: props.Programma ? props.Programma.stoelenLijst : ''
      };
    });
  
    const {  titel, genre, van, tot, descriptie, zaal } = Programma;
    
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const Programma = {
        titel,
        genre,
        van,
        tot,
        descriptie,
        zaal,
        stoelenLijst: maakStoelenLijst(zaal)
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
    const handleSelect= (event) => {
      const { value } = event.target;
      setProgramma((prevState) => ({
        ...prevState,
        zaal: value,
      }));
    }
    const handleSelect2= (event) => {
      const { value } = event.target;
      setProgramma((prevState) => ({
        ...prevState,
        genre: value,
      }));
    }
   

    const zalen =[{"eersteR": 20, "tweedeR": 100,  "derdeR" : 120},
                  {"eersteR": 20, "tweedeR": 160,  "derdeR" : 0},
                  {"eersteR": 10, "tweedeR": 80,  "derdeR" : 0},
                  {"eersteR": 40, "tweedeR": 200,  "derdeR" : 200}];

    function maakStoelenLijst(zaal){
      var eersteR = zalen[zaal-1]['eersteR']
      var tweedeR = zalen[zaal-1]['tweedeR']
      var derdeR = zalen[zaal-1]['derdeR']
  
  
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
      {/* <div className='vTitel'><div >Programma toevoegen</div></div> */}
      <div className='BG_Box'>
      <div className='fBox'>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="titel">
          <Form.Label>Titel: </Form.Label>
          <Form.Control
            required={true}
            className='veld'
            type="text"
            name="titel"
            value={titel}
            placeholder={"Titel"}
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="genre">
          <Form.Label>Genre: </Form.Label>
          <Form.Select className='veld' required={true} onChange={handleSelect2}>
            <option value={"Cabaret"}>Cabaret</option>
            <option value={"Dans"}>Dans</option>
            <option value={"Musical"}>Musical</option>
            <option value={"Zang"}>Zang</option>
            <option value={"Toneel"}>Toneel</option>
            <option value={"Muziek"}>Muziek</option>
            <option value={"Opera"}>Opera</option>
            <option value={"Klassieke_Concerten"}>Klassieke Concerten</option>
            <option value={"Komedie"}>Komedie</option>
          
          </Form.Select>
          <br></br><br></br>
        </Form.Group>
        <Form.Group controlId="van">
          <Form.Label>Begintijd: </Form.Label>
          <Form.Control
       
            required={true}
            className='veld'
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
    
            required={true}
            className='veld'
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
            className='veld'
            as="textarea" rows={3}
            required={true}
            type="text"
            name="descriptie"
            value={descriptie}
            placeholder="Descriptie: "
            onChange={handleInputChange}
          />
          <br></br>
        </Form.Group>
        <Form.Group controlId="stoelenlijst">
          <Form.Label>Zaal: </Form.Label><br></br>
          <Form.Select className='veld' required={true} onChange={handleSelect} >
            <option value={1}>Zaal 1</option>
            <option value={2}>Zaal 2</option>
            <option value={3}>Zaal 3</option>
            <option value={4}>Zaal 4</option>

          </Form.Select>
          <br></br><br></br><br></br>
        </Form.Group>
        <div className='fButton'><div>
        <Button variant="primary" type="submit"  >
          Toevoegen
          
        </Button></div></div>
      </Form>
      </div>
      </div>
    </div>
  );

};

export default ProgrammaForm;