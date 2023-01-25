import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import ProgrammaToevoegen from '../Programma/ProgrammaToevoegen'
import UserManager from './UserManager/UserManager'
import { getCookie } from '../utils'

const AdminPanel = props => {
  const [RequestFinished, RequestisFinished] = useState(false)
  const [ShowAdminComponents, setAdminComponents] = useState(false)

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

  if (RequestFinished) {
    if (ShowAdminComponents) {
      return (
        <div>
          <h1>Welcome Mr.Admin</h1>
          <ProgrammaToevoegen />
          <div className='main-form '>
            {/* <div className='fBox'> */}
            <UserManager />
            {/* </div> */}
          </div>
        </div>
      )
    } else {
      return <Navigate to='/' replace />
    }
  } else {
    return
  }
}

export default AdminPanel
