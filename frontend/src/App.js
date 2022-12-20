import React, { } from 'react';
import ProgrammaToevoegen from './components/ProgrammaToevoegen';
import ProgrammaLijst from './components/ProgrammaLijst';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import './custom.css';
import Programma from './components/Programma';

const App = (props) => {
  return (

    <div className="main-content">
      <BrowserRouter>
        <Routes>
          {/* De index element moet naar de homepage als we die hebben */}
            <Route index element={<Programma />} /> 
            <Route element={<ProgrammaToevoegen />} path="/ProgrammaToevoegen" />
            <Route element={<ProgrammaLijst />} path="/ProgrammaLijst" />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
