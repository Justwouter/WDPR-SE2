import React, { useEffect, useState } from 'react'
import HeadItem from './HeadItem'
import { useNavigate } from 'react-router-dom'
import { getCookie, checkElevationAPI, parseJwt } from '../../utils'

function Header () {
  //First check the JWT token for a role then verify with the API. Only JWT is insecure but the api takes to long.
  const [AdminComponents, setAdminComponents] = useState(false)
  useEffect(() => {
    async function fetchData () {
      checkElevationAPI(getCookie('jwt')).then(response => {
        response != null && response.status === 200
          ? setAdminComponents(true)
          : setAdminComponents(false)
      })
    }

    fetchData()
  }, [])

  useEffect(() => {
    let jwtRAW = getCookie('jwt')
    if (jwtRAW != null && jwtRAW.length > 0) {
      const jwtToken = parseJwt(jwtRAW)
      if ((jwtToken.role === 'Medewerker') | (jwtToken.role === 'Admin')) {
        setAdminComponents(true)
      } else {
        setAdminComponents(false)
      }
    } else {
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
            {/* <HeadItem link='/Doneer' text='Doneer' /> */}
            {AdminComponents && (
              <div>
                <HeadItem link='/AdminPanel' text='Admin Panel' />
                {/* <HeadItem link='/programmatoevoegen' text='Toevoegen' /> */}
              </div>
            )}
          </div>
        </ul>
      </header>
    </div>
  )
}
export default Header
