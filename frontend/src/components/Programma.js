import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Card from '@mui/material/Card';
import {Link} from 'react-router-dom';





const Programma = ({
  programmaId,
  titel,
  van,
  tot,
  descriptie,
  zaal
  
}) => {
  
 

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.common.white,
      backgroundColor: '#1B1725',
    },
  }));
  
  function getMaand(){
    let maandArray = ['Jan', 'Feb', 'Ma', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return maandArray[new Date(van).getMonth()];
  }
  function getDagNr(){
    return new Date(van).getDate();
  }
  function getDagNaam(){
    let dagArray = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    return dagArray[new Date(van).getDay()];
  }
  function getBeginUur(){
    
    let s = (new Date(van).getMinutes()<10 ? '0' : '') + new Date(van).getMinutes();

    return (new Date(van).getHours()<10 ? '0'  : '') + new Date(van).getHours() + ':' + s  ;
  }

  function getEindUur(){
    
    let s = (new Date(tot).getMinutes()<10 ? '0' : '') + new Date(tot).getMinutes();

    return (new Date(tot).getHours()<10 ? '0'  : '') + new Date(tot).getHours() + ':' + s  ;
  }
  function getDuur(){
    var diff = (new Date(tot).getTime() - new Date(van).getTime());
    var minuten = Math.round((diff/1000)/60);
    return minuten ;
  }

    return (
      <TableContainer   component={Card}>
        <Table  sx={{minWidth: 700  }} aria-label="customized table">
          <TableBody >
            <tr>
                <StyledTableCell align="center">
                  <ul className='style2' >{getDagNr()}</ul><br></br>
                  <ul>{getMaand()}</ul></StyledTableCell>
                <StyledTableCell align="center">
                  <ul>{getDagNaam()}<br></br>
                  {getBeginUur()}<br></br>Zaal {zaal}</ul>
                  </StyledTableCell>
                <StyledTableCell align="left">
                  <ul className='style3'>{titel}</ul><br></br>
                  <ul className='style4'>Duur: {getDuur()} minuten</ul> <br></br>
                  <ul>{descriptie}</ul></StyledTableCell>
                
                <StyledTableCell align="center"><u> 
                <Link to= {'/WDPR-SE2/Programma/'+ programmaId +'/StoelReserveren'}
                  state= {{ sTitel: titel, 
                            sDescriptie: descriptie,
                            sZaal: zaal,
                            sBeginUur: getBeginUur(),
                            sDuur: getDuur(),
                            sDagNr: getDagNr(),
                            sDagNaam: getDagNaam(),
                            sMaand: getMaand(),
                            sEindUur: getEindUur()}}
              
                >Bestel</Link>
                </u>
                </StyledTableCell></tr>
          </TableBody>
        </Table>
      </TableContainer>
      
    );
  }
  export default Programma;