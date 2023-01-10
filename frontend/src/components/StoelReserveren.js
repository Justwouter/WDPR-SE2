import React,  {useEffect, useState } from 'react';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {useLocation} from 'react-router-dom'


const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundSize: '250%',
  transition: '0.2s ease-in-out',
  backgroundColor: '#00000000',
  '&:hover': {
    transform: "scale3d(1.2, 1.2, 1)",
    backgroundPosition: 'right',
    border: '#ffffff'
  }
}));

  const StoelReserveren = ({startAnimatie}) => {

  const [ stoelA, setStoelA ] = useState([]);
  const [ stoelB, setStoelB ] = useState([]);
  const [ stoelC, setStoelC ] = useState([]);
  const [ stoelen, setStoelenLijst ] = useState([]);
  const [ gekozenStoelen, setStoelen] = useState([]);

  const { state } = useLocation(); 
  
  const transitionProperty = startAnimatie
    ? { marginTop: '10px', opacity: 1}
    : {};

  const showAlert = () => {
    alert("Kaartjes bestelt");
  }
  
  useEffect(() => {
    async function fetchData(){
        const response = await fetch('http://api.localhost/api/Programma/'+state.sID+'/StoelenLijst');
        const data = await response.json();
   
        setStoelA(data.filter(a => a.rang === "A"));
        setStoelB(data.filter(b => b.rang === "B"));
        setStoelC(data.filter(c => c.rang === "C"));
        setStoelenLijst(data);
    }
    fetchData()
  }, )

  const ToggleKeuzeStoel = (stoel) => {
    const index = gekozenStoelen.toString().indexOf(stoel);
    if (index === -1 && (gekozenStoelen.length < 25) === true ){
      setStoelen((o) => [...o,stoel])
    }else{
      setStoelen(p => p.filter(p => p !== stoel));
    }
    //console.log(gekozenStoelen)
    //console.log(stoelen.filter(s => s.stoelId == stoel))
  };

    return (
      
      <Box  justifyContent="center" className="grid"  sx={{ flexGrow: 3 }}>
        {/* <a className='style10'>Stoel Reserveren</a><br></br> */}
       
        <meta name="viewport" content="width=device-width, initial-scale=1.00, maximum-scale=2.00, minimum-scale=1.00"/>
      <div className='hTitel'>
        <div className='titel'>{state.sTitel} - Zaal {state.sZaal} </div>
        <div className='tijd'>{ state.sBeginUur + '-' + state.sEindUur}</div>
      </div>
     <br></br>
      <div className='info'>{state.sDescriptie}</div><br></br>
      <div className='duur'>Duur: {state.sDuur}min</div>
      <div className='duur'>{state.sDagNaam} {state.sDagNr} {state.sMaand}</div><br></br><br></br>
     
      <div className='rTitel'>Eersterang</div> 
      <Grid container justifyContent="center" spacing={{ xs: 4, md: 1 }} columns={{ xs: 4, sm: 8, md: 45 }}>
      
        {Array.from(stoelA).map((_, index) => (  
          <Grid  maxWidth={45} item xs={3} sm={9} md={4} key={index}>
            
            <Item  className={
            stoelA[index]["status"] === true
              ? "reserveerd"
              : gekozenStoelen.toString().indexOf(stoelA[index]["stoelId"]) !== -1
              ? "gekozen"
              : "vrij"
            } 
                    onClick= {()=> ToggleKeuzeStoel(stoelA[index]["stoelId"])}
            >{"" + stoelA[index]["nr"] } 
             {/* <div style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}></div> */}

            </Item>
          </Grid>
        ))}
        
      </Grid>
      <br></br>
      <div className='rTitel'>Tweederang</div>  
      <Grid  container justifyContent="center"  spacing={{ xs: 4, md: 1 }} columns={{ xs: 4, sm: 8, md: 45 }}>
        
        { Array.from(stoelB).map((_, index) => (
          
          <Grid  maxWidth={45}   md={4} key={index}>
            
            <Item  className={
            stoelB[index]["status"] === true
              ? "reserveerd"
              : gekozenStoelen.toString().indexOf(stoelB[index]["stoelId"]) !== -1
              ? "gekozen"
              : "vrij"
            } 
                    onClick= { ()=> ToggleKeuzeStoel(stoelB[index]["stoelId"])}
            >{"" + stoelB[index]["nr"] } 
            </Item>
          </Grid>
        ))}
      </Grid>
      <br></br>
      {stoelC.length !== 0 &&   
      <div>
      <div className='rTitel'>Derderang</div>  
      <Grid container justifyContent="center" spacing={{ xs: 4, md: 1 }} columns={{ xs: 4, sm: 8, md: 45 }}>
        {Array.from(stoelC).map((_, index) => (
          <Grid  maxWidth={45} item xs={3} sm={9} md={4} key={index}>
            <Item  className={
            stoelC[index]["status"] === true
              ? "reserveerd"
              : gekozenStoelen.toString().indexOf(stoelC[index]["stoelId"]) !== -1
              ? "gekozen"
              : "vrij"
            } 
                    onClick= {()=> ToggleKeuzeStoel(stoelC[index]["stoelId"])}
            >{"" + stoelC[index]["nr"] } 
            </Item>
          </Grid>
        ))}
      </Grid>
      </div>
      }<br></br><br></br><br></br>
      <div className='kaart'>
      <br></br><br></br>
      <div className='stoel'>
          <div className='kTitel'> Stoelen : {gekozenStoelen.length}</div>
          <div><button onClick={showAlert}>Reserveer</button></div>
      </div>

      <div >
        <ul className='inhoud'><br></br>
          {gekozenStoelen.map((value,index) => ( 
            <li className='kCodes' style={transitionProperty}  key={index}>{ value+ "SD" + stoelen.filter(s => s.stoelId === value)[0]["nr"] + '\u00A0'}</li>))}</ul>
      </div></div>
    
    </Box>
    
  );
}
 
 export default   StoelReserveren;
    




