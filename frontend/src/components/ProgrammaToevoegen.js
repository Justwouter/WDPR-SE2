import React from 'react';
import ProgrammaForm from './ProgrammaForm';

const ProgrammaToevoegen = ({ history }) => {
  const handleOnSubmit = async (programma) => {
    await fetch('https://localhost:7153/Programma', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(programma),
    });
    history.push('/programma');
  };

  return (
    <React.Fragment>
      <ProgrammaForm handleOnSubmit={handleOnSubmit} />
      
    </React.Fragment>
  );
};

export default ProgrammaToevoegen;