function UserLink(props){
    const {username} = props
    const handleUserLink = (event) => {
      window.location.href= `/profiles/${username}`
    }
    return <span className = 'pointer' onClick={handleUserLink}>
            {props.children}
    </span>
  }

export default UserLink