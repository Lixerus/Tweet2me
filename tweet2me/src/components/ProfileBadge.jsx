import {useContext} from 'react'
import UserDisplay from './UI/UserDisplay'
import UserPicture from './UI/UserPicture'
import DisplayCount from './UI/DisplayCount'
import { UsernameContext } from '../App'

const ProfileBadge = (props) =>{
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const siteUsername = useContext(UsernameContext)

    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }
    }
    return user ? <>
        <div className='d-flex'>
        <div className='m-3 p-3 border border-secondary fs-5'>
        <div className='d-flex justify-content-between'>
        <UserPicture user={user} hideLink/>
        {console.log(user.username)}
        {siteUsername === user.username ? <span className='pointer fs-6 text-decoration-underline' onClick={() => props.setVisible(true)}>edit</span> : null}
        </div>
        <p><UserDisplay user={user} includeFullName hideLink/></p>
        <p><DisplayCount>{user.follower_count}</DisplayCount>{user.follower_count === 1 ? "follower" : "followers"}</p>
        <p><DisplayCount>{user.following_count}</DisplayCount> following</p>
        <p className="font-weight-italic">{user.location ? `Location: ${user.location}` : null}</p>
        <p className="font-weight-bold">{user.bio ? `Bio: ${user.bio}` : null}</p>
        <button className = 'btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
        </div>
        </div>
        </> : null
}
export default ProfileBadge