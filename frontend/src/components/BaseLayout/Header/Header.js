import React, { useEffect, useState } from 'react'
import HeadItem from './HeadItem'
import { useNavigate } from 'react-router-dom'
import { getCookie, parseJwt } from '../../utils'

function Header() {
  //First check the JWT token for a role then verify with the API. Only JWT is insecure but the api takes to long.
  const [AdminComponents, setAdminComponents] = useState(false)
  const [isLoggedIn, setLoginStatus] = useState(true)
  const [DonateurComponents, setDonateurComponents] = useState(false)

  useEffect(() => {
    async function fetchData() {
      let jwtRAW = getCookie("jwt")
      // let jwtRAW = localStorage.getItem('jwt')
      if (jwtRAW != null && jwtRAW.length > 0) {
        const jwtToken = jwtRAW.replace('"', '')
        fetch('http://api.localhost/api/Role/CheckElevation', {
          method: 'GET',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'text/plain',
            Authorization: 'Bearer ' + jwtToken
          }
        }).then(response => {
          response.status === 200 ? setAdminComponents(true) : setAdminComponents(false)
        })

        fetch('http://api.localhost/api/Donatie/checkDonateur', {
          method: 'GET',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'text/plain',
            Authorization: 'Bearer ' + jwtToken
          }
        }).then(response => {
          response.status === 200 ? setDonateurComponents(true) : setDonateurComponents(false)
        })
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let jwtRAW = getCookie("jwt")
    // let jwtRAW = localStorage.getItem('jwt')
    if (jwtRAW != null && jwtRAW.length > 0) {
      const jwtToken = parseJwt(jwtRAW)
      setLoginStatus(true)
      jwtToken.role === "Medewerker" | jwtToken.role === "Admin" ? setAdminComponents(true) : setAdminComponents(false)
      jwtToken.role === "Donateur" ? setDonateurComponents(true) : setDonateurComponents(false)
    }
    else {
      setAdminComponents(false)
      setLoginStatus(false)
      setDonateurComponents(false)
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
          <React.Fragment>
            <div className='logo' onClick={routeChange} />
            <div className='laak'>
              <HeadItem text='LAAK' />
            </div>
            <div className='lijn'>
              <HeadItem text='____________________' />
            </div>
            <div className='theater'>
              <HeadItem text='THEATER' />
            </div>
          </React.Fragment>

          <div id='HeaderItems' className='basic'>
            <HeadItem link='/programmalijst' text='Programma' />
            <HeadItem link='/Over-ons' text='Over ons' />

            {DonateurComponents && (
              <React.Fragment>
                <HeadItem link='/DonateursPanel' text='Donateurs Panel' />
              </React.Fragment>
            )}

            {AdminComponents && (
              <React.Fragment>
                <HeadItem link='/AdminPanel' text='Admin Panel' />
                {/* <HeadItem link='/programmatoevoegen' text='Toevoegen' /> */}
              </React.Fragment>
            )}

            {isLoggedIn ? (
              <React.Fragment>
                <HeadItem className="RightItems" link='/MyAccount' text="Account" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <HeadItem className="RightItems" link='/Login' text='Login' />
              </React.Fragment>
            )}

          </div>
        </ul>
      </header>
    </div>
  )
}
export default Header