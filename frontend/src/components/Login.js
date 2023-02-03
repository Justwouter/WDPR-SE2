import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Login() {
    const [gebruikersnaam, setGebruikersnaam] = new useState("");
    const [password, setPassword] = new useState("");
    const [formError, setFormError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            var user = { userName: gebruikersnaam, Password: password }
            fetch('http://api.localhost/api/Account/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            }).then((response) => {
                if (response.status === 401) {
                    return null;
                }
                return response.json();
            })
                .then((data) => {
                    document.cookie = "jwt=" + data.token;
                    window.location.href = 'http://frontend.localhost/';
                })
        }
    }

    const validateForm = () => {
        let errorMessage = '';

        if (!gebruikersnaam) {
            errorMessage = 'Gebruikersnaam is noodzakelijk';
        }

        if (!password) {
            if (errorMessage) {
                errorMessage += ' en ';
            }
            errorMessage += 'Wachtwoord is noodzakelijk';
        }

        setFormError(errorMessage);
        return !errorMessage;
    };

    return (
        <div>
            <div className="BG">
                <div className="Content">
                    <div className="Switch">
                        <div className="HuidigeKnop">Login</div>
                        <Link style={{ textDecoration: 'none' }}
                            className='RegistreerSwitch'
                            to={'/Registration'}>
                            Registreer
                        </Link>
                    </div>

                    <div className="fBox">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="gebruikersnaam">Gebruikersnaam:</label>
                            <input className="veld"
                                type="text"
                                id="gebruikersnaam"
                                value={gebruikersnaam}
                                onInput={(e) => setGebruikersnaam(e.target.value)} /><br /><br />

                            <label htmlFor="password">Wachtwoord:</label>
                            <input className="veld"
                                type="password"
                                id="password"
                                value={password}
                                onInput={(e) => setPassword(e.target.value)} /><br /><br />

                            {formError &&
                                <div className="eBG">
                                    <div className="error">{formError}</div></div>}<br></br>

                            <div className="fButton">
                                <button>Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}