import { useNavigate } from "react-router-dom"
import fetchdata from "../fetch_data/globaltweet"
import { useContext} from 'react'
import { CsrfTokenContext } from "../App"

const LogouPage = ({setUsername}) => {
    const csrfToken = useContext(CsrfTokenContext)
    const navigate = useNavigate()

    const handleRegistration = () => {
        fetchdata("POST", 'http://localhost:8000/logout/',null, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
        .then((xhr) => {
          setUsername('')
          navigate('/')
        })
        .catch( e => {
            alert(e)
         } )
      }

    return (<div className="btn btn-group d-flex">
    <button type="button" className="btn btn-primary btn-block m-2 btn-lg" onClick={handleRegistration}>Logout</button>
    <button className="btn-primary btn-block m-2 btn-lg" onClick={() => navigate(-1)}>Back</button>
    </div>
    )
}


export default LogouPage