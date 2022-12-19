import React, {  } from 'react';
import ProgrammaToevoegen from './components/ProgrammaToevoegen';
import ProgrammaLijst from './components/ProgrammaLijst';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import './custom.css';

const App = (props) => {
  return (
    
      <div className="main-content">
      <BrowserRouter>
       <Routes>
        <Route element={<ProgrammaToevoegen/>} path="/ProgrammaToevoegen" />
        <Route element={<ProgrammaLijst/>} path="/ProgrammaLijst" />
        <Route exact path='/' element={<ProgrammaLijst/>} />
        </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
