import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UsernameContext } from "../../App"

const Navbar = () =>{
    const username = useContext(UsernameContext)
    return (
    <>
    <nav className="navbar navbar-expand navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Tweet2me</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Global</Link>
          </li>
          {username !== '' ?  <li className="nav-item">
            <Link className="nav-link" to="/feed">Feed</Link>
          </li> : null}
          {username !== '' ? <li className="nav-item">
            <Link className="nav-link" to={`/profile/${username}`}>Profile</Link>
          </li> : null}
          {username === '' ? <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li> : null}
          {username === '' ? <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li> : null}
          {username !== '' ?  <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li> : null}
          {/* <li className="nav-item"></li>
            <a className="nav-link" href="{% url "social:begin" "github" %}">Login with Github</a>
          </li> */}
          <li className="nav-item">
            {username}
          </li>
        </ul>
          
      </div>
    </div>
  </nav>

  <Outlet />
  </>
    )
}

export default Navbar