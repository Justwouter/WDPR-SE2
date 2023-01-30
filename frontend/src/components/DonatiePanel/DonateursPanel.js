import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils'
import { Navigate } from 'react-router'
import DonateursPanelContent from "./DonateursPanelContent";

export default function DonateursPanel () {
    const [RequestFinished, RequestisFinished] = useState(false)
    const [isDonateur, setIsDonateur] = useState(false)
  
    useEffect(() => {
      async function fetchData() {
        const jwtToken = getCookie("jwt").replace('"', '')
        fetch('http://api.localhost/api/Donatie/checkDonateur', {
          method: 'GET',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'text/plain',
            Authorization: 'Bearer ' + jwtToken
          }
        }).then(response => {
          if (response.status === 200) {
            setIsDonateur(true)
          } else {
            setIsDonateur(false)
          }
          RequestisFinished(true)
        })
      }
      fetchData()
    }, [])
  
  
    return (
        <div>
        {isDonateur ? <DonateursPanelContent/> : <Navigate to='/' replace />}
        </div>
    )
}