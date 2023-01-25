import React from "react";

export default function OverOns() {
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
                <p>Lieve theaterliefhebbers,</p>
                <p>Theater Laak is een prachtig cultureel centrum in de gemeente Laak,
                    dat al jaren het hart van de gemeenschap is. We bieden een scala aan optredens,
                    van toneelstukken tot concerten en dansvoorstellingen. Onze missie is om kunst
                    toegankelijk te maken voor iedereen, en we zijn trots op het feit dat we dat al jaren
                    met succes doen.</p>
                <p>Echter, het runnen van een theater is niet goedkoop. We zijn afhankelijk van
                    donaties om onze deuren open te houden en onze activiteiten te kunnen blijven organiseren.
                    Als u Theater Laak een warm hart toedraagt en u wilt helpen ons te steunen, dan zouden
                    wij uw donatie ontzettend waarderen.</p>
                <p>Elke donatie, hoe klein ook, helpt ons om onze missie voort te zetten en onze
                    gemeenschap te blijven bedienen. Als dank voor uw donatie, bieden we u de mogelijkheid
                    om een gratis kaartje te winnen voor één van onze komende voorstellingen.</p>
                <p>Dank u voor uw steun en we hopen u snel te zien bij Theater Laak!</p>
                <form action="https://example.com/donate" method="post">
                    <label for="amount">Donatiebedrag:</label>
                    <input type="number" id="amount" name="amount" min="1" />
                    <input type="submit" value="Doneer" />
                </form>
            </div>
        </div>
    )
}