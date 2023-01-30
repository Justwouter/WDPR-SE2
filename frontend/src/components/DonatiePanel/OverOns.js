import React, { useEffect, useState } from "react";
import { getCookie, parseJwt } from "../utils";

export default function OverOns() {
    const [toestemming, setToestemming] = useState(false);

    async function changeToestemming() {
        var jwt = getCookie("jwt");
        if (jwt === null) {
            setToestemming(false);
            return;
        }
        var id = parseJwt(jwt).Id;
        var status = await fetch("http://api.localhost/api/Donatie/checkToken/" + id)
        .then(result => result.status);
        setToestemming(status === 200);
    }

    useEffect (() => {
        changeToestemming()
    }, [])

    function askPermission() {
        var id = parseJwt(getCookie("jwt")).Id;
        window.location.href = "https://ikdoneer.azurewebsites.net/Toegang?url=http://api.localhost/api/Donatie/AddToken/"+id;
    }

    function doDonatie() {
        window.location.href = "https://ikdoneer.azurewebsites.net/Donatie/Create?doel=66";
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
                {toestemming ? <button onClick={doDonatie}>Doneer</button> : <button onClick={askPermission}>Vraag eerst toestemming</button>}
            </div>
        </div>
    )
}