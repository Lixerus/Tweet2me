import { Link } from "react-router-dom"
const NotFoundPage = () =>{
    return(
        <div className="container d-flex vh-100 justify-content-center align-items-center">
            <div className='fs-3 p-3'>Page Not found. 404</div>
            <br/>
            <Link to='/' >Go home</Link>
        </div>
    )
}
export default NotFoundPage