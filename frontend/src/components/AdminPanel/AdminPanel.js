import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import ProgrammaToevoegen from '../Programma/ProgrammaToevoegen'
import UserManager from './UserManager/UserManager'
import { getCookie } from '../utils'
import DonatieManager from './DonatieManager/DonatieManager'

const AdminPanel = props => {
  const [RequestFinished, RequestisFinished] = useState(false)
  const [ShowAdminComponents, setAdminComponents] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const jwtToken = getCookie("jwt").replace('"', '')
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
        RequestisFinished(true)
      })
    }
    fetchData()
  }, [])


  if (RequestFinished) {
    if (ShowAdminComponents) {
      return (
        <div>
          <h1>Welcome Mr.Admin</h1>
          <ProgrammaToevoegen />
          <div className='main-form '>
            {/* <div className='fBox'> */}
              <UserManager />
              <DonatieManager/>
            {/* </div> */}

          </div>
        </div>
      )
    } else {
      return <Navigate to='/' replace />
    }
  }
  else {
    return
  }
}

export default AdminPanel
