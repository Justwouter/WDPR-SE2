import React, { useState } from "react";
import { Form } from "react-router-dom";

export default function DonatieForm () {
    const [formData, setFormData] = useState({
        Doel: 66,
        Hoeveelheid: Number,
        Tekst: String
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://ikdoneer.azurewebsites.net/api/donatie", {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="donatie">Donatie hoeveelheid:</label>
            <input className="veld"
            type="number"
            id="donatie"
            value={formData.Hoeveelheid}
            onInput={(e) => setGebruikersnaam(e.target.value)}
            ></input>
        </form>
    )
}