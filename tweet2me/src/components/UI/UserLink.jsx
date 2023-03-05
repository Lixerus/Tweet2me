import { Link } from "react-router-dom"

const UserLink = (props) =>{
    const {username} = props
    // const handleUserLink = (event) => {
    //   window.location.href= `/profiles/${username}`
    // }
    return <span className = 'pointer'>
      <Link to = {`/profile/${username}`} className="text-decoration-none text-dark">
            {props.children}
      </Link>
    </span>
  }

export default UserLink