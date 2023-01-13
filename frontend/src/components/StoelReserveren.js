import React,  {useEffect, useState } from 'react';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProgrammaLijst from './ProgrammaLijst';


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

  const [ stoelA, setStoelA ] = useState([]);
  const [ stoelB, setStoelB ] = useState([]);
  const [ stoelC, setStoelC ] = useState([]);
  const [ stoelen, setStoelenLijst ] = useState([]);
  const [ gekozenStoelen, setStoelen] = useState([]);

  const { state } = useLocation(); 
  
 
  useEffect(() => {
    async function fetchData(){
        const response = await fetch('http://api.localhost/api/Programma/'+state.sID+'/StoelenLijst');
        const data = await response.json();
        setStoelA(data.filter(a => a.rang === "A" ));
        setStoelB(data.filter(b => b.rang === "B" ));
        setStoelC(data.filter(c => c.rang === "C" ));
        setStoelenLijst(data);
    }
    fetchData().catch(err => {
      console.error(); })
  },[state?.sID] )

  const ToggleKeuzeStoel = (stoel) => {
    const index = gekozenStoelen.indexOf(stoel);
    if (index === -1 && (gekozenStoelen.length < 25) === true ){
      setStoelen((o) => [...o,stoel])
    }else{
      setStoelen(p => p.filter(p => p !== stoel));
    }
    //console.log(gekozenStoelen)
    //console.log(stoelen.filter(s => s.stoelId == stoel))
  };

  const MaakRangGrid = (rang) => {
    return(
      <Grid container justifyContent="center" spacing={{ xs: 4, md: 1 }} columns={{ xs: 4, sm: 8, md: 45 }}>
          {Array.from(rang).map((_, index) => (  
          <Grid  maxWidth={45} item xs={3} sm={9} md={4} key={index}>
            <Item  className={
              rang[index]["status"] === true
                ? "reserveerd"
                : gekozenStoelen.indexOf(rang[index]["stoelId"]) !== -1
                ? "gekozen"
                : "vrij" } 
              onClick= {()=> ToggleKeuzeStoel(rang[index]["stoelId"])}
            >{"" + rang[index]["nr"] } 
            </Item>
          </Grid>))}
      </Grid>)}


    if(state?.sID != null){
      return (
        <Box  justifyContent="center" className="grid"  sx={{ flexGrow: 3 }}>
          <div className='hTitel'>
            <div className='titel'>{state.sTitel} - Zaal {state.sZaal} </div>
            <div className='tijd'>{ state.sBeginUur + '-' + state.sEindUur}</div>
          </div><br></br>
  
          <div className='info'>{state.sDescriptie}</div><br></br>
          <div className='duur'>Duur: {state.sDuur}min</div>
          <div className='duur'>{state.sDagNaam} {state.sDagNr} {state.sMaand}</div><br></br><br></br>
       
  
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
            <div><Link to= {'/BetalingsForm'}><Button>Reserveer
              </Button>
            
            </Link></div>
            }
            </div>
        <div className='inhoud'>
          <ul><br></br>
            {gekozenStoelen.map((value,index) => ( 
              <div className='kCodes'  key={index}>{ value+ "SD" + stoelen.filter(s => s.stoelId === value)[0]["nr"] + '\u00A0'}</div>))}</ul></div></div>
      </Box>
    );
    }else{
      return(
        <ProgrammaLijst />
      )
    }
    
}
 
 export default   StoelReserveren;
    



