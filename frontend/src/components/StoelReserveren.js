import React,  {useEffect, useState } from 'react';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProgrammaLijst from './Programma/ProgrammaLijst';
import {getMaand, getDagNr, getDagNaam, getUur, getDuur} from './utils.js';


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

  const StoelReserveren = () => {

  const [ programma, setProgramma ] = useState([]);
  const [ stoelA, setStoelA ] = useState([]);
  const [ stoelB, setStoelB ] = useState([]);
  const [ stoelC, setStoelC ] = useState([]);
  const [ stoelen, setStoelenLijst ] = useState([]);
  const [ gekozenStoelen, setStoelen] = useState([]);


  const pid = localStorage.getItem("pid");
  
  
 
  useEffect(() => {
    async function fetchData(){
        const response = await fetch('http://api.localhost/api/Programma/'+pid);
        const data = await response.json();
        setProgramma(data);
  

        const response2 = await fetch('http://api.localhost/api/Programma/'+pid+'/StoelenLijst');
        const data2 = await response2.json();
        setStoelA(data2.filter(a => a.rang === "A" ));
        setStoelB(data2.filter(b => b.rang === "B" ));
        setStoelC(data2.filter(c => c.rang === "C" ));
        setStoelenLijst(data2);
    }
    fetchData().catch(err => {
      console.error(); })
  },[pid] )

  const ToggleKeuzeStoel = (stoel) => {
    const index = gekozenStoelen.indexOf(stoel);
    if (index === -1 && (gekozenStoelen.length < 25) === true ){
      setStoelen((o) => [...o,stoel])
    }else{
      setStoelen(p => p.filter(p => p !== stoel));
    }
  };

  const MaakRangGrid = (rang) => {
    return(
      <Grid container justifyContent="center" spacing={{ xs: 4, md: 1 }} columns={{ xs: 4, sm: 8, md: 45 }}>
          {Array.from(rang).map((_, i) => (  
          <Grid  maxWidth={45} item xs={3} sm={9} md={4} key={i}>
            <Item  className={
              rang[i]["status"] === true
                ? "reserveerd"
                : gekozenStoelen.indexOf(rang[i]["stoelId"]) !== -1
                ? "gekozen"
                : "vrij" } 
              onClick= {()=> ToggleKeuzeStoel(rang[i]["stoelId"])}
            >{"" + rang[i]["nr"] } 
            </Item>
          </Grid>))}
      </Grid>)}


    if(pid!= null){
      return (
        <Box  justifyContent="center" className="grid"  sx={{ flexGrow: 3 }}>
          <div className='hTitel'>
            <h1 className='titel'>{programma["titel"]} - Zaal {programma["zaal"]} </h1>
            <div className='tijd'>{getUur(programma["van"]) + '-' + getUur(programma["tot"])}</div>
          </div><br></br>
  
          <div className='info'>{programma["descriptie"]}</div><br></br>
          <div className='duur'>Duur: {getDuur(programma["van"],programma["tot"])}min</div>
          <div className='duur'>Genre: {programma["genre"]}</div>
          <div className='duur'>{getDagNaam(programma["van"])} {getDagNr(programma["van"])} {getMaand(programma["van"])}</div><br></br><br></br>
       
  
        <div className='rTitel'>Eersterang</div> 
          {MaakRangGrid(stoelA)}<br></br>
       
  
        <div className='rTitel'>Tweederang</div>  
          {MaakRangGrid(stoelB)}<br></br>
  
        {stoelC.length !== 0 &&   
          <div>
            <div className='rTitel'>Derderang</div>  
              {MaakRangGrid(stoelC)}</div>}<br></br><br></br><br></br>
        
        <div className='kaart'><br></br><br></br>
        <div className='stoel'>
            <div className='kTitel'> Stoelen : {gekozenStoelen.length}</div>
            {gekozenStoelen.length !== 0 && 
            <div><Link to= {"/BetalingsForm"} 
            state= {{ sID: pid,
              sGStoelen: gekozenStoelen}}
              onClick={() => {localStorage.setItem("gStoelen", gekozenStoelen)}} 
            ><Button>Reserveer
              </Button>
            
            </Link></div>
            }
            </div>
        <div className='inhoud'>
          <div><br></br>
            {gekozenStoelen.map((value,index) => ( 
              <div className='kCodes'  key={index}>{ value+ "SD" + stoelen.filter(s => s.stoelId === value)[0]["nr"] + '\u00A0'}</div>))}</div></div></div>
      </Box>
    );
    }else{
      return(
        <ProgrammaLijst />
      )
    }
    
}
 
 export default StoelReserveren;
