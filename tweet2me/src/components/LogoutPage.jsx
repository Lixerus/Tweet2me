import { useNavigate } from "react-router-dom"
import fetchdata from "../fetch_data/globaltweet"
import {useState, useEffect} from 'react'

const LogouPage = () => {
    const [csrfToken, setCsrfToken] = useState('')
    const navigate = useNavigate()

    const getCSRF = (e) => {
        fetchdata("GET","http://localhost:8000/api/tweets/csrftoken/")
        .then((xhr) => {
          const csrfToken = xhr.getResponseHeader('X-CSRFToken')
          setCsrfToken(csrfToken)
        })
        .catch(err => alert(err))
      }
  
      useEffect(()=> {
        getCSRF()
      }, [])

    const handleRegistration = () => {
        fetchdata("POST", 'http://localhost:8000/logout/',null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
        .then((xhr) => {
          navigate('/')
        })
        .catch( e => {
            alert(e)
         } )
      }

    return (
    <button type="button" className="btn btn-primary btn-block m-2" onClick={handleRegistration}>Logout</button>
    )
}


export default LogouPage