import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import Programma from './Programma';

const ProgrammaLijst = () => {
  const [ loading, setLoading ] = useState(true);
  const [ programmas, setProgramma ] = useState([]);



  useEffect(() => {
    async function fetchData(){
        const response = await fetch(env.BACKEND_URL+'api/Programma');
        const data = await response.json();
        setProgramma(data);
        setLoading(false);
    }
    fetchData()
  }, []);


  return loading ? "Laden..." : (
      <div className="attractie-list">
        {!_.isEmpty(programmas) ? (
          programmas.map((programma) => (
            <Programma key={programma.id} {...programma} />
          ))
        ) : (
          <p className="message">Er zijn nog geen programmas!</p>
        )}
      </div>
  );
};

export default ProgrammaLijst;
