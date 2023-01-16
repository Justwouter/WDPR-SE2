import React, {useState} from "react";
import { useNavigate } from "react-router";
export default function Registration() {
    const [userName, setUserName] = new useState("");
    const [email, setEmail] = new useState("");
    const [password, setPassword] = new useState("");
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            var user = {userName: userName, email: email, Password: password}
            fetch('http://api.localhost/api/Account/registreer', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            }).then(response => {
                if (response.status === 201){
                    alert("Alles is goed gegaan.")
                    navigate('/Login')
                } else {
                    alert("Er is iets mis gegaan, probeer het later nogmaals.")
                }
            })
        }
    }

    const validateForm = () => {
        let errorMessage = '';
        if (!userName) {
            errorMessage = 'Gebruikersnaam is noodzakelijk'
        }
        if (!email) {
            if (errorMessage) {
                errorMessage += ' en ';
            }
            errorMessage += 'Email is noodzakelijk';
        } else if (!validateEmail()) {
            if (errorMessage) {
                errorMessage += ' en ';
            }
            errorMessage += 'Voer a.u.b. een werkende email in';
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

    const validateEmail = () => {
        // Check if email is a valid format using a regular expression
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    };

    return (
        <div>
            <h1>Registreer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Gebruikersnaam:</label>
                <input type="text"
                       id="userName"
                       value={userName}
                       onInput={(e) => setUserName(e.target.value)}/>
                <br/>
                <br/>
                <label htmlFor="email">Email:</label>
                <input type="text"
                       id="email"
                       value={email}
                       onInput={(e) => setEmail(e.target.value)}/>
                <br/>
                <br/>
                <label htmlFor="password">Wachtwoord:</label>
                <input type="password"
                       id="Registerpassword"
                       value={password}
                       onInput={(e) => setPassword(e.target.value)}/>
                <br/>
                <br/>
                {formError && <div className="error">{formError}</div>}
                <button>Registreer</button>
            </form>
        </div>
    );
}