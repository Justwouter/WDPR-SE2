import React from 'react';
import { useNavigate } from "react-router";
import ProgrammaForm from './ProgrammaForm';

const ProgrammaToevoegen = ({ history }) => {
  const navigate = useNavigate();
  const handleOnSubmit = async (programma) => {
    await fetch('http://api.localhost/api/Programma', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(programma),
    });
    navigate("/ProgrammaLijst");
  };

  return (
    <React.Fragment>
      <ProgrammaForm handleOnSubmit={handleOnSubmit} />
      
    </React.Fragment>
  );
};

export default ProgrammaToevoegen;