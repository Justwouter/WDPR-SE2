import React from 'react';
import HeadItem from './HeadItem';
import { useNavigate } from "react-router-dom";




function Header() {

let navigate = useNavigate(); 
const routeChange = () =>{ 
  let path = `frontend.local/`; 
  navigate(path);
}
    return (
        <div className="header-basic">
            <header>
                <ul className="list-inline">
                    
                    <div className='logo' onClick={routeChange}></div>
                    <div className='laak' ><HeadItem text="LAAK"  /></div>
                    <div className='lijn'><HeadItem text="____________________"/></div>
                    <div className='theater'><HeadItem  text="THEATER" /></div>
                    
                    
                    <div className='basic'>
                        <HeadItem link="/programmalijst" text="Programma" />
                        <HeadItem link="/programmatoevoegen" text="Toevoegen" />
                        <HeadItem link="/Login" text="Login" />
                        <HeadItem link="/Registration" text="Registreer" />
                    </div>
                    
                </ul>
            </header>
        </div>
    );
}
export default Header;
