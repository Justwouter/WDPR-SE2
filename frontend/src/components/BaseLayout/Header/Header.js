import React, { useEffect, useState } from 'react'
import HeadItem from './HeadItem'
import { useNavigate } from 'react-router-dom'

function Header() {
  //First check the JWT token for a role then verify with the API. Only JWT is insecure but the api takes to long.
  const [AdminComponents, setAdminComponents] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const jwtToken = localStorage.getItem('jwt').replace('"', '')
      fetch('http://api.localhost/api/Role/CheckElevation', {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'text/plain',
          Authorization: 'Bearer ' + jwtToken
        }
      }).then(response => {
        if (response.status === 200) {
          setAdminComponents(true)
        } else {
          setAdminComponents(false)
        }
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    function parseJwt(token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    }
    const jwtToken = parseJwt(localStorage.getItem('jwt'))
    if (jwtToken.role === "Medewerker" | jwtToken.role === "Admin") {
      setAdminComponents(true)
    }
    else {
      setAdminComponents(false)
    }
  }, [])


  let navigate = useNavigate()
  const routeChange = () => {
    let path = `/`
    navigate(path)
  }

  return (
    <div className='header-basic'>
      <header>
        <ul className='list-inline'>
          <div className='logo' onClick={routeChange}></div>
          <div className='laak'>
            <HeadItem text='LAAK' />
          </div>
          <div className='lijn'>
            <HeadItem text='____________________' />
          </div>
          <div className='theater'>
            <HeadItem text='THEATER' />
          </div>

          <div id='HeaderItems' className='basic'>
            <HeadItem link='/programmalijst' text='Programma' />
            <HeadItem link='/Login' text='Login' />
            <HeadItem link='/Registration' text='Registreer' />
            {AdminComponents && (
              <div>
                <HeadItem link='/AdminPanel' text='Admin Panel' />
                <HeadItem link='/programmatoevoegen' text='Toevoegen' />
              </div>
            )}
          </div>
        </ul>
      </header>
    </div>
  )
}
export default Header