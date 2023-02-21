import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const Navbar = () =>{
    return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Tweet2me</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile/edit">Edit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/global">Global</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          {/* <li className="nav-item"></li>
            <a className="nav-link" href="{% url "social:begin" "github" %}">Login with Github</a>
          </li> */}
        </ul>
        <form className="d-flex d-none" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <Outlet />
  </>
    )
}

export default Navbar