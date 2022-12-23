import React, { useContext, useEffect, useState } from 'react';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from 'react-bootstrap';
import Programma from './Programma';
import { useParams } from 'react-router';


let nextId = 0;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  const StoelReserveren = () => {
  const {id} = useParams();
  
  
  const [ stoelA, setStoelA ] = useState([]);
  const [ stoelB, setStoelB ] = useState([]);
  const [ stoelC, setStoelC ] = useState([]);
  const [ gStoelen, setStoelen] = useState([]);

  const showAlert = () => {
    alert("Kaartjes bestelt");
  }
  

  useEffect(() => {
    async function fetchData(){
      
        
        const response = await fetch('http://localhost:7153/Programma/'+id+'/StoelenLijst');
        const data = await response.json();
        //setStoelen(data);
        setStoelA(data.filter(a => a.rang == "A" && a.status == false));
        setStoelB(data.filter(b => b.rang == "B" && b.status == false));
        setStoelC(data.filter(c => c.rang == "C" && c.status == false));
    }
    fetchData()
  }, [])

  // function slaStoelOp(i) {
  //   setStoelen([
  //     ...gStoelen,
  //     { id: nextId++, kaart: stoelA[index]["nr"] + stoelA[index]["rang"] }
  //     ]);
    
  // }

  
  

 
    return (
      
      <Box sx={{ flexGrow: 3 }}>
        <a>Stoel Reserveren</a><br></br><br></br><br></br><br></br><br></br><br></br>
        <a>Eersterang</a>
      <Grid container  spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 45 }}>
      
        {Array.from(stoelA).map((_, index) => (  
          <Grid maxWidth={75} item xs={3} sm={9} md={4} key={index}>
            <Item  onClick= {() => {
                    setStoelen([
                    ...gStoelen,
                    { id: nextId++, kaart: stoelA[index]["nr"] + stoelA[index]["rang"] }
                    ]);}}  
            >
            {"" + stoelA[index]["nr"] + stoelA[index]["rang"]} 
            </Item>
          </Grid>
        ))}
      </Grid>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <a>Tweederang</a>      
      <Grid  container  spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 45 }}>
        { Array.from(stoelB).map((_, index) => (
          <Grid  maxWidth={75} item xs={3} sm={9} md={4} key={index}>
            <Item onClick= {() => {
                    setStoelen([
                    ...gStoelen,
                    { id: nextId++, kaart: stoelB[index]["nr"] + stoelB[index]["rang"] }
                    ]);}} 
            >{"" + stoelB[index]["nr"] + stoelB[index]["rang"]} </Item>
          </Grid>
        ))}
      </Grid>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <a>Derderang</a>      
      <Grid container  spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 45 }}>
        {Array.from(stoelC).map((_, index) => (
          <Grid maxWidth={75} item xs={3} sm={9} md={4} key={index}>
            <Item onClick= {() => {
                    setStoelen([
                    ...gStoelen,
                    { id: nextId++, kaart: stoelC[index]["nr"] + stoelC[index]["rang"] }
                    ]);}} 
            
            >{"" + stoelC[index]["nr"] + stoelC[index]["rang"]} </Item>
          </Grid>
        ))}
      </Grid>
      <br></br><br></br> <br></br><br></br> 
      <ul> Stoelen:
        {gStoelen.map(g => (
          <li key={g.id}>{g.kaart}</li>
        ))}
      </ul>

      <button onClick={showAlert}>Bestellen</button>
      
    </Box>
  );
}
 
 export default   StoelReserveren;
    




