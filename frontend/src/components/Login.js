import React, {useState} from "react";
export default function Login() {
    const [email, setEmail] = new useState("");
    const [password, setPassword] = new useState("");
    const [formError, setFormError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert(email)
        }
    }

    const validateForm = () => {
        let errorMessage = '';

        if (!email) {
            errorMessage = 'Email is noodzakelijk';
        } else if (!validateEmail()) {
            errorMessage = 'Voer a.u.b. een werkende email in';
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text"
                       id="email"
                       value={email}
                       onInput={(e) => setEmail(e.target.value)}/>
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