import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'

const AdminPanel = props => {
  const [RequestFinished, RequestisFinished] = useState(false)
  const [ShowAdminComponents, setAdminComponents] = useState(false)

  useEffect(() => {
    async function fetchData () {
      const jwtToken = localStorage.getItem('jwt').replace('"', '')
      console.log(jwtToken)
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
        </div>
      )
    } else {
      return <Navigate to='/' replace />
    }
  }
  else{
    return
  }
}

export default AdminPanel
