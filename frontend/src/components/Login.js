import React, {useState} from "react";
export default function Login() {
    const [gebruikersnaam, setGebruikersnaam] = new useState("");
    const [password, setPassword] = new useState("");
    const [formError, setFormError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            var user = {userName: gebruikersnaam, Password: password}
            fetch('http://api.theaterlaak.site/api/Account/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            }).then((response) => response.json())
                .then((data) => {
                    window.localStorage.setItem("jwt", data.token);
                    window.location.href = 'http://theaterlaak.site/';
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="gebruikersnaam">Gebruikersnaam:</label>
                <input type="text"
                       id="gebruikersnaam"
                       value={gebruikersnaam}
                       onInput={(e) => setGebruikersnaam(e.target.value)}/>
                <br/>
                <br/>
                <label htmlFor="password">Wachtwoord:</label>
                <input type="password"
                       id="password"
                       value={password}
                       onInput={(e) => setPassword(e.target.value)}/>
                <br/>
                <br/>
                {formError && <div className="error">{formError}</div>}
                <button>Log in</button>
            </form>
        </div>
    );
}