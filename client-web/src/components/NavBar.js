import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBasket } from 'react-icons/fa';

import PopUpComponent from "./PopUpComponent";
import ProfilePopUp from "./ProfilePopUp";

const Navbar = ({ numberOfDishes, dispatch, userName }) => {

    const [numberOfDish, setNumberOfDish] = useState(numberOfDishes)
    useEffect(() => {
        setNumberOfDish(numberOfDishes);
    }, [numberOfDishes]);
    return (
        <div className="Navbar">
            <Link to='/' className="NavbarH2">
                <h2>talabat</h2>
            </Link>
            <Link to='/all' className="NavbarH2">
                <h2 >All resturant</h2>
            </Link>
            {
                userName === '' ? (
                    <PopUpComponent button={
                        <div className='basket'>
                            <FaShoppingBasket
                                size={50}
                            />
                            <p>{numberOfDish}</p>
                        </div>}
                        dispatch={dispatch}
                    />
                ) :
                    <Link to='/checkout'>
                        <div className='basket'>
                            <FaShoppingBasket
                                size={50}
                                
                                onClick={() => console.log(numberOfDishes)}
                            />
                            <p>{numberOfDish}</p>
                        </div>
                    </Link>
            }

            {
                userName === '' ? <PopUpComponent button={<h3 className="NavbarH3">Login</h3>} dispatch={dispatch} /> : <ProfilePopUp profileName={userName} dispatch={dispatch} />
            }
        </div>
    );
};

export default Navbar;