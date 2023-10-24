import siteLogo from '../../assets/PersonaPal.svg';
import './Navbar.css'
import AuthButtons from '../AuthButtons/AuthButtons';
const Navbar = () => {
    return ( 
        <nav>
            <div className = "left">
                <img src={siteLogo} alt='logo'/>
            </div>
            {/* unordered list <ul> */}
            <div className="right">
                <ul>
                    <AuthButtons/>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;