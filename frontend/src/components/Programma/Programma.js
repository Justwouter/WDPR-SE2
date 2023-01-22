import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import {Link} from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Card from '@mui/material/Card';
import {StoelReserveren} from './utils.js';

import {getMaand, getDagNr, getDagNaam, getUur, getDuur} from './utils.js';


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
      color: theme.palette.common.white
    },
  }));
  

    return (
      <TableContainer   component={Card}>
      
        <Table  sx={{minWidth: 700  }} aria-label={titel}>
          <TableBody >
            <tr>
                <StyledTableCell className='table1'align="center">
                    <div className='style2' >{getDagNr(van)}</div><br></br>
                    <div>{getMaand(van)}</div>
                  </StyledTableCell>
                <StyledTableCell className='table2' align="center">
             
                  <div>{getDagNaam(van)}<br></br>
                  {getUur(van)}<br></br>Zaal {zaal}</div>
                  </StyledTableCell>
                <StyledTableCell className='table3' align="left">
          
                  <h1 className='style3'>{titel}</h1><br></br>
                  <div className='style4'>Duur: {getDuur(van,tot)} minuten</div> <br></br>
                  <div>{descriptie}</div></StyledTableCell>
                
                <StyledTableCell className='table4' align="center">
                <Link  className='bestelKnop' onClick={() => {StoelReserveren(programmaId)}} to="/Programma/StoelReserveren"
                >Bestel</Link>
                </StyledTableCell></tr>
          </TableBody>
        </Table>
        
      </TableContainer>

      
      
    );
  }
  export default Programma;