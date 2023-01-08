import React, { Component } from 'react';
import Logo from './afbeeldingen/logo.png';
import './Header.css'

export class Headers extends Component {
  static displayName = Headers.name;

  render() {
    return(
       <div>
             <nav className="nav">
            <ul className="nav_list">
              <div>
                <li className="nav_item2">
                  Klantenservice &amp; contact</li>
                <li className="nav_item2">
                  Vacatures</li>
                <li className="nav_item2">
                  NL</li><br /></div>
              <div>
                <li className="nav_listlogo"><img style={{ width: 150, height: 100 }} src={Logo}/></li><br />
                <li className="nav_listitem">Home
                  <ul className="nav_listitemdrop">
                    <li>Drop 1</li>
                    <li>Drop 2</li>
                    <li>Drop 3</li></ul></li>
                <li className="nav_listitem">Programma
                  <ul className="nav_listitemdrop">
                    <li>Drop 1</li>
                    <li>Drop 2</li>
                    <li>Drop 3</li></ul></li>
                <li className="nav_listitem">Winkelmand
                  <ul className="nav_listitemdrop">
                    <li>Drop 1</li>
                    <li>Drop 2</li>
                    <li>Drop 3</li></ul></li>
                <li className="nav_item"><i className="gg-search" /></li>
                <li className="nav_item"><button className="btn-inloggen">Inloggen</button></li></div><ul><br /></ul></ul></nav>
          
       </div>
    );
}}
export default Headers;
