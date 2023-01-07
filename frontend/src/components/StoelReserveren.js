import React, { useContext, useEffect, useState } from 'react';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { useParams } from 'react-router';

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,

  backgroundSize: '200%',
 
  transition: '0.5s',
  
  '&:hover': {
    
    backgroundPosition: 'right'
  }
}));

  const StoelReserveren = () => {
  const {id} = useParams();

  const [ stoelA, setStoelA ] = useState([]);
  const [ stoelB, setStoelB ] = useState([]);
  const [ stoelC, setStoelC ] = useState([]);
  const [ stoelen, setStoelenLijst ] = useState([]);
  const [ gekozenStoelen, setStoelen] = useState([]);
  const [selecteerd, setSelectie] = useState(false);
  const showAlert = () => {
    alert("Kaartjes bestelt");
  }
  
  useEffect(() => {
    async function fetchData(){
        const response = await fetch('http://localhost:7153/Programma/'+id+'/StoelenLijst');
        const data = await response.json();
   
        setStoelA(data.filter(a => a.rang == "A"));
        setStoelB(data.filter(b => b.rang == "B"));
        setStoelC(data.filter(c => c.rang == "C"));

        setStoelenLijst(data);
    }
    fetchData()
  }, [])

  const ToggleKeuzeStoel = (stoel) => {
    const index = gekozenStoelen.toString().indexOf(stoel);

    if (index === -1){
      setStoelen((o) => [...o,stoel])
    }else{
      setStoelen(p => p.filter(p => p != stoel));
    }
    console.log(gekozenStoelen)
    //console.log(stoelen.filter(s => s.stoelId == stoel))
  };

    return (
      <Box textAlign={"center"} sx={{ flexGrow: 3 }}>
        <a>Stoel Reserveren</a><br></br><br></br><br></br><br></br><br></br><br></br>
        <a>Eersterang</a>
      <Grid  container  spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 45 }}>
      
        {Array.from(stoelA).map((_, index) => (  
          <Grid  maxWidth={75} item xs={3} sm={9} md={4} key={index}>
            <Item  className={
            stoelA[index]["status"] == true
              ? "reserveerd"
              : gekozenStoelen.toString().indexOf(stoelA[index]["stoelId"]) !== -1
              ? "gekozen"
              : "vrij"
            } 
                    onClick= {() => ToggleKeuzeStoel(stoelA[index]["stoelId"])}
            >{"" + stoelA[index]["nr"] } 
             {/* <div style={{ visibility: this.state.driverDetails.firstName != undefined? 'visible': 'hidden'}}></div> */}

            </Item>
          </Grid>
        ))}
      </Grid>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <a>Tweederang</a>      
      <Grid  container  spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 45 }}>
        { Array.from(stoelB).map((_, index) => (
          <Grid  maxWidth={75} item xs={3} sm={9} md={4} key={index}>
            <Item  className={
            stoelB[index]["status"] == true
              ? "reserveerd"
              : gekozenStoelen.toString().indexOf(stoelB[index]["stoelId"]) !== -1
              ? "gekozen"
              : "vrij"
            } 
                    onClick= {() => ToggleKeuzeStoel(stoelB[index]["stoelId"])}
            >{"" + stoelB[index]["nr"] } 
            </Item>
          </Grid>
        ))}
      </Grid>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <a>Derderang</a>      
      <Grid container  spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 45 }}>
        {Array.from(stoelC).map((_, index) => (
          <Grid className="grid" maxWidth={75} item xs={3} sm={9} md={4} key={index}>
        
            <Item  className={
            stoelC[index]["status"] == true
              ? "reserveerd"
              : gekozenStoelen.toString().indexOf(stoelC[index]["stoelId"]) !== -1
              ? "gekozen"
              : "vrij"
            } 
                    onClick= {() => ToggleKeuzeStoel(stoelC[index]["stoelId"])}
            >{"" + stoelC[index]["nr"] } 
            </Item>
          </Grid>
        ))}
      </Grid>
      <br></br><br></br> <br></br><br></br> 
      <ul> Kaartjes:
      {gekozenStoelen.map((value,index) => ( 
        <div key={index}>{ value+ "SD" + stoelen.filter(s => s.stoelId == value)[0]["nr"]
        }</div>
      ))}
      </ul>

      <button onClick={showAlert}>Bestellen</button>
      
    </Box>
  );
}
 
 export default   StoelReserveren;
    




