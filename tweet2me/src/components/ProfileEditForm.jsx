import fetchdata from "../fetch_data/globaltweet"
import { useContext, useState, useRef } from "react"
import { CsrfTokenContext } from "../App"

const ProfileEditForm = ({setVisible, profileData, setProfile}) =>{
    let csrfToken = useContext(CsrfTokenContext)
    const [errorMsg, setErrorMsg] = useState(null)
    const firstName = useRef('')
    const lastName = useRef('')
    const email = useRef('')
    const bio = useRef('')
    const location = useRef('')

    const updateProfile = (e) => {
        if (e.target.form.reportValidity()){
            const data = {
                username : profileData.username,
                first_name : firstName.current.value.trim(),
                last_name : lastName.current.value.trim(),
                email : email.current.value.trim(),
                bio : bio.current.value.trim(),
                location: location.current.value.trim()
            }
            fetchdata("POST", "http://localhost:8000/api/profile/edit/", data, {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
            .then((xhr) => {
                setErrorMsg(null)
                setProfile(prev => { return {...prev, ...xhr.response}})
                setVisible(false)
            })
            .catch((res) => setErrorMsg(res))
        }
    }


    return (
        <form>
        <h3 className="text-center p-3 bold">Edit Profile</h3>
        <label className="w-100 mb-2" > First Name
          <input type="text" className="form-control" ref={firstName} name='first-name' maxLength='35' autoComplete="off" defaultValue={`${profileData.first_name}`}/>
        </label>
        <label className="w-100 mb-2"> Last Name
          <input type="text" className="form-control" ref={lastName} name='last-name' maxLength='35' autoComplete="off" defaultValue={`${profileData.last_name}`}/>
        </label>
        <label className="w-100 mb-2"> Email
          <input type="email" className="form-control" ref={email} name='email' maxLength='35' autoComplete="off"  required="on" defaultValue={`${profileData.email}`}/>
        </label>
        <label className="w-100 mb-2"> Bio
          <input type="text" className="form-control" ref={bio} name='bio' maxLength='35' autoComplete="off" defaultValue={profileData.bio === null ? "" : `${profileData.bio}`}/>
        </label>
        <label className="w-100 mb-2"> Location
          <input type="text" className="form-control" ref={location} name='location'maxLength='35' autoComplete="off" defaultValue={profileData.location === null ? "" : `${profileData.location}`}/>
        </label>
            {errorMsg && Object.values(errorMsg).map((child) => <div className="text-danger font-weight-bold m-1" key={`${child}`}>{child}</div>)}
        <div className="d-flex flex-column align-items-center p-1">
            <button type="button" className="btn btn-primary btn-block m-2" onClick={(e)=>updateProfile(e)}>Submit</button>
        </div>
        </form>
    )
}

export default ProfileEditForm