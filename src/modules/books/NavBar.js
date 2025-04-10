import { Link } from "react-router-dom";


const NavBar = () => {
    return (
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/wishlist" className="nav-link">Wishlist</Link>
      </nav>
    );
  };
  
  export default NavBar;