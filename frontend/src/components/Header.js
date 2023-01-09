import React, {} from 'react';
import { useNavigate } from "react-router-dom";
import Logo from './afbeeldingen/logo.png';
import './Header.css'

const Header = () => {
  



  const navigate = useNavigate(); 
  
  const home = () =>{ 
  navigate('/WDPR-SE2/');
  }

  const programma = () =>{ 
    navigate('/WDPR-SE2/ProgrammaLijst');
  }

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
                <li className="nav_listlogo"><img style={{ width: 150, height: 100 }} alt='logo' src={Logo}/></li><br />
                <li className="nav_listitem" onClick={home}>Home
                  <ul className="nav_listitemdrop">
                    <li className='hDrop'>Drop 1</li>
                    <li className='hDrop'>Drop 2</li>
                    <li className='hDrop'>Drop 3</li></ul></li>
                <li className="nav_listitem" onClick={programma}>Programma
                  <ul className="nav_listitemdrop">
                    <li className='hDrop'>Drop 1</li>
                    <li className='hDrop'>Drop 2</li>
                    <li className='hDrop'>Drop 3</li></ul></li>
                <li className="nav_listitem">Winkelmand
                  <ul className="nav_listitemdrop">
                    <li className='hDrop'>Drop 1</li>
                    <li className='hDrop'>Drop 2</li>
                    <li className='hDrop'>Drop 3</li></ul></li>
                <ul className="nav_item"><ul className="gg-search" /></ul>
                <li className="nav_item"><button className="btn-inloggen">Inloggen</button></li></div><ul><br /></ul></ul></nav>
          
       </div>
    );
}
export default Header;
