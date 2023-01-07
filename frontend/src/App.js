import React from 'react';
import ProgrammaToevoegen from './components/ProgrammaToevoegen';
import ProgrammaLijst from './components/ProgrammaLijst';
import StoelReserveren from './components/StoelReserveren';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import './custom.css';

const App = (props) => {
  return (
    
      <div className="main-content">
      <BrowserRouter>
       <Routes>
        <Route element={<ProgrammaToevoegen/>} path="/WDPR-SE2/ProgrammaToevoegen" />
        <Route element={<ProgrammaLijst/>} path="/WDPR-SE2/ProgrammaLijst" />
        <Route element={<StoelReserveren/>} path="/WDPR-SE2/Programma/:id/StoelReserveren" />
        <Route exact path='/WDPR-SE2' element={<ProgrammaLijst/>} />
        </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
