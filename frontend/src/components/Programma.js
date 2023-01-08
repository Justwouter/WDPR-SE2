import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const history = useNavigate();
 

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
  function getDuur(){
    return new Date(tot).getDate() - new Date(van).getDate()  ;
  }

    return (
      <TableContainer  component={Card}>
        <Table sx={{minWidth: 700  }} aria-label="customized table">
          <TableBody >
            
                <StyledTableCell align="center">
                  <a className='style2' id='TitelGrootRood'>{getDagNr()}</a><br></br>
                  <b>{getMaand()}</b></StyledTableCell>
                <StyledTableCell align="center">
                  <b>{getDagNaam()}<br></br>
                  {getBeginUur()}<br></br>Zaal {zaal}</b>
                  </StyledTableCell>
                <StyledTableCell align="left">
                  <a className='style3'>{titel}</a><br></br>
                  <a className='style4'>Duur: {getDuur()} uur</a> <br></br>
                  <b>{descriptie}</b></StyledTableCell>
                
                <StyledTableCell align="center"><u> 
                <Link to= {'/WDPR-SE2/Programma/'+programmaId+'/StoelReserveren'}
                  state= {{ sTitel: titel, 
                            sDescriptie: descriptie,
                            sZaal: zaal,
                            sBeginUur: getBeginUur(),
                            sDuur: getDuur(),
                            sDagNr: getDagNr(),
                            sDagNaam: getDagNaam(),
                            sMaand: getMaand()}}
              
                ><a >Bestel </a></Link>
                </u>
                </StyledTableCell>
             
                
          </TableBody>
        </Table>
      </TableContainer>
      
    );
  }
  export default Programma;