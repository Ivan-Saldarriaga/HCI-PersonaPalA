import siteLogo from '../../assets/PersonaPal.svg';
import './Navbar.css'
const Navbar = () => {
    return ( 
        <nav>
        <div className = "left">
            <img src={siteLogo} alt='logo'/>
        </div>
        {/* unordered list <ul> */}
        <div className="right">
        <ul>
            <li>
            <a href="#home">LOGIN?</a>
            </li>
        </ul>
        </div>
        </nav>
     );
}
 
export default Navbar;