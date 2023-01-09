import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';


const Programma = ({
  id,
  titel,
  van,
  tot,
  descriptie
  
}) => {
  const history = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  function getDag(){
    let maandArray = ['Jan', 'Feb', 'Ma', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return maandArray[new Date(van).getMonth()];
  }
  

    return (
      <TableContainer component={Card}>
        <Table sx={{minWidth: 700  }} aria-label="customized table">
        
          <TableBody >
                <StyledTableCell align="left">{titel}</StyledTableCell>
                <StyledTableCell align="left">{getDag()}</StyledTableCell>
                <StyledTableCell align="left">{tot}</StyledTableCell>
                <StyledTableCell align="left">{descriptie}</StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  export default Programma;