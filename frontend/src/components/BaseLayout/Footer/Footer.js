import React from 'react';
import Footitem from './FootItem';


function Footer() {
    return (
        <div className="footer-basic">
            <footer>
                <ul className="list-inline">
                    <Footitem link="/" text="Home" />
                    <Footitem link="/programmalijst" text="Lijst" />
                    <Footitem link="/programmatoevoegen" text="Toevoegen" />
                    <Footitem link="/Login" text="Login" />
                </ul>
            </footer>
        </div>
    );
}

export default Footer;
