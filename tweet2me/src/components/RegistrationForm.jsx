import { useEffect, useRef, useState } from "react"
import fetchdata from "../fetch_data/globaltweet"
import {Link} from 'react-router-dom'

const RegistrationForm = () =>{
    const [csrfToken, setCsrfToken] = useState('')

    let usernameInput = useRef('')
    let emailInput = useRef('')
    let passwordInput = useRef('')
    let repPasswordInput = useRef('')
    
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

    const validateFields = (errorText) =>{
        let formIsValid = true
        if(usernameInput.current.value.trim().lenght < 3){
            errorText.username = "Length of the name without spaces should be greater than 3"
            formIsValid = false
        }
        if (passwordInput.current.value.trim().lenght < 3){
            errorText.password = "Length of the password without spaces should be greater than 3"
            formIsValid = false
        }
        if(passwordInput.current.value !== repPasswordInput.current.value){
            errorText.password = "Passwords are not the same"
            formIsValid = false
        }
      return formIsValid
    }

    const handleRegistration = () => {
      const data = {username:usernameInput.current.value.trim(), password:passwordInput.current.value.trim()}
      fetchdata("POST", 'http://localhost:8000/register/', data , {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
      .then((xhr) => {
        console.log(xhr.response)
      })
      .catch( e => console.log(e) )
    }

    const onSubmit = (e) =>{
        const errorText = {}
        if (e.target.form.reportValidity() || validateFields(errorText)){
          handleRegistration()
        }
    }
    return (
    <>
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="col-4">
       <form>
        <h3 className="text-center p-3 bold">
          Register
        </h3>
      {/* <!-- Username input --> */}
            <label className="w-100 mb-4"> Username*
              <input type="text" ref={usernameInput} className="form-control" name='username' minLength="3" maxLength='25' autoComplete="off"/>
            </label>
      {/* <!-- Email input --> */}
          <label className="w-100 mb-4">Email address
            <input type="email"  ref = {emailInput} className="form-control" name='email' minLength="4" maxLength='25' autoComplete="off"/>
          </label>

      {/* <!-- Password input --> */}
          <label className="w-100 mb-4">Password*
            <input type="password" ref={passwordInput} className="form-control" name='password1' minLength="3" maxLength='25' autoComplete="off"/>
          </label>

        {/* <!-- Password input --> */}
          <label className="w-100 mb-4">Repeat password*
            <input type="password" ref={repPasswordInput} className="form-control" name='password2' minLength="3" maxLength='25' autoComplete="off"/>
          </label>

        {/* <!-- 2 column grid layout for inline styling --> */}
        {/* <div className="row mb-4">
          <div className="col d-flex justify-content-start">
            <!-- Checkbox -->
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" checked />
              <label className="form-check-label"> Remember me </label>
            </div>
          </div>
          <div className="col d-flex justify-content-end">
            <!-- Simple link -->
            <a href="#!">Forgot password?</a>
          </div>
        </div> */}
        <div className="d-flex flex-column align-items-center p-1">
          <button type="button" className="btn btn-primary btn-block m-2" onClick={onSubmit}>Submit</button>
          <Link to='/login' className="m-2">Already registered?</Link>
        </div>
       </form>
      </div>
    </div>
    </>
    )
}

export default RegistrationForm