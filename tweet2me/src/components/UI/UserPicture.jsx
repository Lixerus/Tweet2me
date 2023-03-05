import UserLink from "./UserLink"

function UserPicture (props) {
    const {user, hideLink} = props
    const userIdSpan = <span className='px-3 py-2 rounded-circle bg-dark text-white mx-1'> 
    {user.username[0]}</span>
    return hideLink === true ? userIdSpan : <UserLink username={user.username}>{userIdSpan}</UserLink>
  }


export default UserPicture
  