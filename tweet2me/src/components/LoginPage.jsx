import { useEffect, useRef, useState } from "react"
import fetchdata from "../fetch_data/globaltweet"
import {Link, useNavigate} from 'react-router-dom'

const LoginPage = () =>{
    const [csrfToken, setCsrfToken] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate();

    let usernameInput = useRef('')
    let passwordInput = useRef('')
    
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
      const data = {username:usernameInput.current.value.trim(), password:passwordInput.current.value.trim()}
      fetchdata("POST", 'http://localhost:8000/login/', data , {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
      .then((xhr) => {
        setErrorMsg(old => null)
        navigate('/')
      })
      .catch( e => {
        const newErrorMsg = e
        setErrorMsg(old => newErrorMsg)
       } )
    }

    const onSubmit = (e) =>{
        const errorText = {}
        if (e.target.form.reportValidity()){
          console.log("Im in on valid")
          handleRegistration()
        }
        else{
          console.log("Im in invalid")
          setErrorMsg(errorText)
        }
    }

    return (
    <>
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="col-4">
        <form>

        <h3 className="text-center p-3 bold">Login</h3>

            <label className="w-100 mb-4"> Username
              <input type="text" ref={usernameInput} className="form-control" name='username' minLength="3" maxLength='25' autoComplete="off" required="on"/>
            </label>

          <label className="w-100 mb-4">Password
            <input type="password" ref={passwordInput} className="form-control" name='password1' minLength="3" maxLength='25' autoComplete="off" required="on"/>
          </label>

          {errorMsg && Object.values(errorMsg).map((child) => <div className="text-danger font-weight-bold m-1">{child}</div>)}

        <div className="d-flex flex-column align-items-center p-1">
          <button type="button" className="btn btn-primary btn-block m-2" onClick={onSubmit}>Submit</button>
          <Link to='/register' className="m-2">Need to register?</Link>
        </div>

        </form>
      </div>
    </div>
    </>
    )
}

export default LoginPage