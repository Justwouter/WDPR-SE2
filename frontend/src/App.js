import React from 'react';
import ProgrammaLijst from './components/Programma/ProgrammaLijst';
import StoelReserveren from './components/StoelReserveren';

import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import './custom.css';
import { Navigate } from "react-router-dom";
import Home from './components/Home';
import Programma from './components/Programma/Programma';
import BaseLayout from './components/BaseLayout/BaseLayout';
import Login from './components/Login'
import Registration from "./components/Registration";
import BetalingsForm from './components/Bestellen/BetalingsForm';
import Succesvol from './components/Bestellen/Succesvol';
import AdminPanel from './components/AdminPanel/AdminPanel';
import OverOns from './components/DonatiePanel/OverOns';
import DonatiePagina from './components/DonatiePanel/DonatiePagina';
import Bedankt from './components/DonatiePanel/Bedankt';
// import Donatie from './components/Donatie';


const App = () => {
  return (
    <div className="main-content">
      <BrowserRouter>
        <Routes>
          {/* De index element moet naar de homepage als we die hebben */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route element={<Login />} path="/Login" />
            <Route element={<Registration />} path="/Registration" />
            <Route element={<Programma />} path="/Programma" />
            <Route element={<BetalingsForm />} path="/BetalingsForm"/>
            <Route element={<Succesvol />} path="/Succesvol"/>
            <Route element={<ProgrammaLijst />} path="/ProgrammaLijst" />
            <Route element={<StoelReserveren/>} path="/Programma/StoelReserveren" />
            <Route element={<AdminPanel/>} path="/AdminPanel"/>
            <Route element={<OverOns/>} path="/Over-ons"/>
            {/* <Route element={<Donatie/>} path="/Doneer"/> */}
            <Route element={<Navigate to="/" />} path="*" />
            <Route element={<DonatiePagina/>} path="/Donatie"/>
            <Route element={<Bedankt/>} path="/Bedankt"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;