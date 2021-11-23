import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return(
        <nav id="navbar">
            <Link className="navbar-link" to="/">Home</Link>
            <Link className="navbar-link" to="/reviews">Reviews</Link>
        </nav>
    )
}

export default Navbar;