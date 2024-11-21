import UserLink from "./UserLink"

const UserDisplay = (props) => {
    const {user, includeFullName, hideLink} = props
    const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null
    return(<>
        {nameDisplay}
        {hideLink === true ? `@${user.username}` : <UserLink username={user.username}>@{user.username}</UserLink>}
        </>
        )
  }
  

export default UserDisplay