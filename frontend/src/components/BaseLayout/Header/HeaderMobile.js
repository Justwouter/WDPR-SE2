import React, { useState } from 'react';
import HeadItem from './HeadItem';

function HeaderMobile() {
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!isOpen)
    }



    return (

        <React.Fragment>
            {/* <div id="hamburger-icon" className={isOpen ? 'open' : null} onClick={openMenu}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <ul className="mobile-menu">
                    <HeadItem link="/programmalijst" text="Programma" />
                    <HeadItem link="/programmatoevoegen" text="Toevoegen" />
                    <HeadItem link="/Login" text="Login" />
                </ul>
            </div> */}
            <div className="header-basic">
                <header>
                    <ul className="list-inline">

                        <div className='logo' onClick={toggleMenu}></div>
                        <div className='laak' ><HeadItem text="LAAK" /></div>
                        <div className='lijn'><HeadItem text="____________________" /></div>
                        <div className='theater'><HeadItem text="THEATER" /></div>

                        {isOpen && <div className='basic' >
                            <HeadItem link="/programmalijst" text="Programma" />
                            <HeadItem link="/programmatoevoegen" text="Toevoegen" />
                            <HeadItem link="/Login" text="Login" />
                        </div>}


                    </ul>
                </header>
            </div>
        </React.Fragment>
    );
}
export default HeaderMobile;
