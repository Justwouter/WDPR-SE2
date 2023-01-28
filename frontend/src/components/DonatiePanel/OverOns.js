import React, { useEffect, useState } from "react";
import { getCookie, parseJwt } from "../utils";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function OverOns() {
    const [toestemming, setToestemming] = useState(false);
    let navigate = useNavigate();

    async function changeToestemming() {
        var jwt = getCookie("jwt");
        if (jwt === null) {
            setToestemming(false);
            return;
        }
        var id = parseJwt(jwt).Id;
        var status = await fetch("http://api.localhost/api/Donatie/" + id)
        .then(result => result.status);
        setToestemming(status === 200);
        console.log(toestemming)
    }

    useEffect (() => {
        changeToestemming()
    }, [])

    function askPermission() {
        var id = parseJwt(getCookie("jwt")).Id;
        window.location.href = "https://ikdoneer.azurewebsites.net/Toegang?url=http%3A%2F%2Fapi.localhost%2Fapi%2FDonatie%2FAddToken%2F"+id;
    }

    return (
        <div>
            <h1>Over ons</h1>
            <div>
                <h4>Wie zijn wij?</h4>
                <p>
                    Laaktheater probeert kunst persoonlijk te maken.<br />
                    Dat betekent dat we kunst op zo veel verschillende manieren brengen dat er voor iedereen een mogelijkheid is het zich eigen te maken en te beleven.<br />
                    Dat kunst niet eng is of niet voor jou, maar dat kunst echt voor en van iedereen is.<br />
                    Als je maar een manier vindt of krijgt aangeboden die bij je past.<br />
                </p>
            </div>
            <div>
                <h4>Steun ons</h4>
                <p>Donaties zijn altijd welkom.</p>
                {toestemming ? <Link to="/Donatie">Doneer</Link> : <button onClick={askPermission}>Vraag eerst toestemming</button>}
            </div>
        </div>
    )
}