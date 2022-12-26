import React from 'react';
import ProgrammaToevoegen from './components/ProgrammaToevoegen';
import ProgrammaLijst from './components/ProgrammaLijst';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import './custom.css';
import { Navigate } from "react-router-dom";
import Home from './components/Home';
import Programma from './components/Programma';
import BaseLayout from './components/BaseLayout/BaseLayout';
import Login from './components/Login'

const App = (props) => {
  return (

    <div className="main-content">
      <BrowserRouter>
        <Routes>
          {/* De index element moet naar de homepage als we die hebben */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route element={<ProgrammaToevoegen />} path="/ProgrammaToevoegen" />
            <Route element={<ProgrammaLijst />} path="/ProgrammaLijst" />
            <Route element={<Programma />} path="/Programma" />
            <Route element={<Login />} path="/Login" />
            <Route element={<Navigate to="/" />} path="*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
