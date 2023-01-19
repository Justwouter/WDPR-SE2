import React from 'react';
import { useNavigate } from "react-router";
import ProgrammaForm from './ProgrammaForm';

const AddElevatedUser = ({ history }) => {

  const handleOnSubmit = async (user) => {
    await fetch('http://api.localhost/api/Account/registreer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <React.Fragment>
      <ProgrammaForm handleOnSubmit={handleOnSubmit} />
      
    </React.Fragment>
  );
};

export default AddElevatedUser;