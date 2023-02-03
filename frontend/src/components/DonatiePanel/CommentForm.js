import React, { useEffect, useState } from 'react'
import { getCookie, parseJwt } from "../utils";


export default function CommentForm() {
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const jwtToken = getCookie("jwt").replace('"', '')
        var id = parseJwt(jwtToken).Id[0];
        var value = { commenter: id, content: comment}
        fetch('http://api.localhost/api/Donatie/Comment', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + jwtToken
            },
            body: JSON.stringify(value)
        })
    }

    useEffect(() => {
        setComment("");
    }, [handleSubmit])

    return (
        <div className="fBox">
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">Wachtwoord:</label>
                <input className="veld"
                    type="text"
                    id="comment"
                    value={comment}
                    onInput={(e) => setComment(e.target.value)} /><br /><br />

                <div className="fButton">
                    <button>Comment</button>
                </div>
            </form>
        </div>
    )
}