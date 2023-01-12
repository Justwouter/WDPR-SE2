import React, { Component } from 'react'

import ProgrammaLijst from '../ProgrammaLijst';
import StoelReserveren from '../StoelReserveren';
import Programma from '../Programma';
import BetalingsForm from './BetalingsForm';

export default class MultiFormBestellen extends Component {

    state = {
      stap: 1,
      ProgrammId: '',
      Titel: '', 
      Descriptie: '',
      Zaal: '',
      BeginUur: '',
      Duur: '',
      DagNr: '',
      DagNaam: '',
      Maand: '',
      EindUur: '',
      
      Kaarten: '',
      Kosten: '',

      Voornaam: '',
      Achternaam: '',
      Email: '',
      Adres: '',
      Telefoon: '',
    }
  
    // Vorige stap
    vorigeStap = () => {
      const { stap } = this.state;
      this.setState({ stap: stap - 1 });
    }
  
    // Volgende stap
    volgendeStap = () => {
      const { stap } = this.state;
      this.setState({ stap: stap + 1 });
    }
  
    // Fields Handler
    handleChange = input => e => {
      this.setState({ [input]: e.target.value });
    }
  
    render() {
      const { stap } = this.state;
      const { ProgrammId, Titel, BeginUur, Duur, DagNr, DagNaam, Maand, EindUur, Descriptie, Zaal, Kaarten, Kosten, Voornaam, Achternaam, Email, Adres, Telefoon } = this.state;
      const values = { ProgrammId, Titel, BeginUur, Duur, DagNr, DagNaam, Maand, EindUur, Descriptie, Zaal, Kaarten, Kosten, Voornaam, Achternaam, Email,Adres, Telefoon}
      
      switch(stap) {
        case 1: 
          return (
            <StoelReserveren
                volgendeStap={ this.volgendeStap }
                handleChange={ this.handleChange }
                values={ values }
            />
           
          )
        case 2: 
          return (
            <BetalingsForm 
                vorigeStap={ this.vorigeStap }
                volgendeStap={ this.volgendeStap }
                handleChange={ this.handleChange }
                values={ values }
            />
          )
        // case 3: 
        //     return (
        //       <BetalingsForm 
        //         vorigeStap={ this.vorigeStap }
        //         volgendeStap={ this.volgendeStap }
        //         values={ values }
        //       />
        //     )
        //   case 4: 
        //     return (
        //       <SuccesvolB />
        //     )
        default: 
            // do nothing
      }
    }
  }