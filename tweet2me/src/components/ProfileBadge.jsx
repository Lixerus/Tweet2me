import {useState, useEffect, useContext} from 'react'
import UserDisplay from './UI/UserDisplay'
import UserPicture from './UI/UserPicture'
import DisplayCount from './UI/DisplayCount'
import fetchdata from '../fetch_data/globaltweet'
import { CsrfTokenContext } from '../App'
import MyModal from './UI/MyModal/MyModal'
import ProfileEditForm from './ProfileEditForm'



function ProfileBadge(props){
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }


    }
    return user ? <>
        <div className='d-flex justify-content'>
        <div className='m-3 p-3'>
        <UserPicture user={user} hideLink/>
        <p><UserDisplay user={user} includeFullName hideLink/></p>
        <p><DisplayCount>{user.follower_count}</DisplayCount>{user.follower_count === 1 ? "follower" : "followers"}</p>
        <p><DisplayCount>{user.following_count}</DisplayCount> following</p>
        <p>{user.location}</p>
        <p>{user.bio}</p>
        <button className = 'btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
        </div>
        <button className='btn btn-primary m-3' onClick={() => props.setVisible(true)}>Edit user page</button>
        </div>
        </> : null
}

function ProfileBadgeComponent(props){
    const username = "Lixerus"
    const [didLookup , setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(null)
    const [modalIsActive, setModalIsActive] = useState(false)
    let csrfToken = useContext(CsrfTokenContext)

    useEffect(()=>{
        if (didLookup ===false){

            fetchdata("GET", `http://localhost:8000/api/profile/${username}/`)
            .then( (xhr) => setProfile(prev => xhr.response))
        setDidLookup(true)
        }
    },[username, didLookup, setDidLookup])


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