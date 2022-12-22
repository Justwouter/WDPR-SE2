import React from 'react';
import ShowsForm from './ShowsForm';

const AddShow = ({ history }) => {
  const handleOnSubmit = async (show) => {
    await fetch('http://localhost:7153/api/Performance', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(show),
    });
    history.push('/show');
  };

  return (
    <React.Fragment>
      <ShowsForm handleOnSubmit={handleOnSubmit} />
      
    </React.Fragment>
  );
};

export default AddShow;