import { CsrfTokenContext } from '../App'
import MyModal from './UI/MyModal/MyModal'
import ProfileEditForm from './ProfileEditForm'
import fetchdata from '../fetch_data/globaltweet'
import {useState, useEffect, useContext} from 'react'
import ProfileBadge from './ProfileBadge'

const ProfileBadgeComponent = ({username}) =>{
    const [didLookup , setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(null)
    const [modalIsActive, setModalIsActive] = useState(false)
    let csrfToken = useContext(CsrfTokenContext)

    useEffect(()=>{
        fetchdata("GET", `http://localhost:8000/api/profile/${username}/`)
        .then( (xhr) => setProfile(prev => xhr.response))
        .then( () => setDidLookup(true))
        .catch((res) => alert("User not found"))
    },[username])

    const handleNewFollow = (actionVerb) =>{
        setProfileLoading(true)
        fetchdata("POST", `http://localhost:8000/api/profile/${username}/follow/`, {action : actionVerb.toLowerCase()} , {"X-CSRFToken" : `${csrfToken}`, "Content-Type" : "application/json"})
        .then( (xhr) => {
            if (xhr.status === 200){
                setProfile(xhr.response)
            }
            setProfileLoading(false)
        })
        .catch((res) => console.log(res))
    }

    return didLookup === false ? "Loading..." : 
        profile ? <>
            <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} setVisible={setModalIsActive}/>
            <MyModal visible={modalIsActive} setVisible={setModalIsActive}>
                <ProfileEditForm profileData = {profile} setProfile={setProfile} setVisible={setModalIsActive}/>
            </MyModal>
            </>: null
}

export default ProfileBadgeComponent