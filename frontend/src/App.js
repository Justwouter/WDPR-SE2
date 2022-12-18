import React, {  } from 'react';
import ProgrammaToevoegen from './components/ProgrammaToevoegen';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import './custom.css';

const App = (props) => {
  return (
    
      <div className="main-content">
      <BrowserRouter>
       <Routes>
        <Route element={<ProgrammaToevoegen/>} path="/ProgrammaToevoegen" />
        <Route element={(props) => (<div>Deze pagina bestaat nog niet. Het is leerzaam deze pagina te maken.</div>)} path="/pasAttractieAaan" />
        <Route exact path='/' element={<ProgrammaToevoegen/>} />
        </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
