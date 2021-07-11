import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
const Navbar = () => {
    const { user } = React.useContext(UserContext);

    return (
        <div className="Navbar">
            <Link to='/' className="NavbarH2">
                <h2>talabat</h2>
            </Link>
            <Link to='/all' className="NavbarH2">
                <h2 >All resturant</h2>
            </Link>
            {
                user.loggedIn === undefined ? (<Link to='/login' className="NavbarH3" >
                    <h3>Login</h3>
                </Link>

                ) : (<Link to='/logout' className="NavbarH3" >
                    <h3>Logout</h3>
                </Link>)
            }
        </div>
    );
};

export default Navbar;