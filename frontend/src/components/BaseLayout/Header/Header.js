import React, { useEffect, useState } from 'react';
import HeadItem from './HeadItem';
import { useNavigate } from "react-router-dom";


function Header() {
    const [AdminComponents, setAdminComponents] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const jwtToken = localStorage.getItem('jwt').replace("\"", "")
            console.log(jwtToken)
            fetch('http://api.localhost/api/Role/CheckElevation', {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain',
                    'Authorization': "Bearer "+jwtToken
                },

            }).then(response => {
                if (response.status === 200) {
                    setAdminComponents(true)
                }
                else{
                    setAdminComponents(false);
                }
            });

        }
        fetchData()
    }, []);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `frontend.local/`;
        navigate(path);
    }


    return (
        <div className="header-basic">
            <header>
                <ul className="list-inline">

                    <div className='logo' onClick={routeChange}></div>
                    <div className='laak' ><HeadItem text="LAAK" /></div>
                    <div className='lijn'><HeadItem text="____________________" /></div>
                    <div className='theater'><HeadItem text="THEATER" /></div>


                    <div id='HeaderItems' className='basic'>
                        <HeadItem link="/programmalijst" text="Programma" />
                        <HeadItem link="/programmatoevoegen" text="Toevoegen" />
                        <HeadItem link="/Login" text="Login" />
                        <HeadItem link="/Registration" text="Registreer" />
                        {AdminComponents && <HeadItem link="/programmalijst" text="Admin Panel" />}
                    </div>

                </ul>
            </header>
        </div>
    );
}
export default Header;
