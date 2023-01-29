import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie, parseJwt, deleteCookie } from './utils'

function MyAccount() {
    const [jwtInfo, setJWTInfo] = useState({})
    let navigate = useNavigate()
    
    useEffect(() => {
        let jwtRAW = getCookie("jwt")
        // let jwtRAW = localStorage.getItem('jwt')
        if (jwtRAW != null && jwtRAW.length > 0) {
          const jwtToken = parseJwt(jwtRAW)
          console.log(jwtToken)
          setJWTInfo(jwtToken)
        }
        else{
            navigate("/")
        }
    }, [navigate])

    const handleLogoutButton = () =>{
        deleteCookie("jwt")
        navigate(0)
    }
    


    return(
        <React.Fragment>
            <h1>Hello user {jwtInfo.Name + "!"}</h1>
            <button onClick={handleLogoutButton}>Log Out</button>
        </React.Fragment>
    );

}
export default MyAccount;