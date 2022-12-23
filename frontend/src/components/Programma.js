import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Card from '@mui/material/Card';
import ProgrammaLijst from './ProgrammaLijst';


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
      backgroundColor: theme.palette.common.black,
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
    
    let s = (new Date(van).getMinutes()<10?'0':'') + new Date(van).getMinutes();

    return new Date(van).getHours() + " : " + s  ;
  }
  function getDuur(){
    return new Date(tot).getDate() - new Date(van).getDate()  ;
  }

    return (
      <TableContainer  component={Card}>
        <Table sx={{minWidth: 700  }} aria-label="customized table">
          <TableBody >
                <StyledTableCell align="center">
                  <f id='TitelGrootRood'>{getDagNr()}</f><br></br>
                  <b>{getMaand()}</b></StyledTableCell>
                <StyledTableCell align="center">
                  <b>{getDagNaam()}<br></br>
                  {getBeginUur()}<br></br>Zaal {zaal}</b>
                  </StyledTableCell>
                <StyledTableCell align="left">
                  <c>{titel}</c><br></br>
                  <d>Duur: {getDuur()} uur</d> <br></br>
                  <b>{descriptie}</b></StyledTableCell>
                <StyledTableCell align="center"><u> <a href={'http://localhost:3000/WDPR-SE2/Programma/'+zaal+'/StoelReserveren'}>Bestel </a></u></StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  export default Programma;