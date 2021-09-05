import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const ResturantMenu = (props) => {
    const location = useLocation()
    const { _id } = location.state
    const [dishs, setDishs] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/menu/${_id}`)
            .then(response => response.json())
            .then(data => {
                setDishs(data.menu.dishes);

            });

    })
    return (
        <div className="ResturantDivBottom">
            <h1>Menu</h1>
            {
                dishs.map(dish => {
                    return (
                        <DishComponent dish={dish} order={props.order} dispatch={props.dispatch} restId={_id} />
                    )
                })
            }
        </div>
    );
};
const DishComponent = (props) => {
    const { dish, dispatch, restId } = props;
    const [quantity, setQuantity] = useState(0);
    const [display, setDisplay] = useState('none')
   

    return (
        <div className='dishContainer' key={dish._id} onClick={() => setDisplay('')} >
            <div className='dish'>
                <h2>{dish.name}</h2>
                <p className='dishInfo'>{dish.info}</p>
            </div >
            <div className='priceAndPlus'>
                <p>{dish.price} EGP</p>
            </div>
            <div className='priceAndPlus' style={{ display }}>
                <p style={{ fontSize: 25 }}
                    className='ResturantDivTopButton'
                    onClick={() => {
                        if (quantity == 0)
                            return
                        setQuantity(quantity - 1);
                    }}>-</p>
                <p style={{ fontSize: 25 }} >{quantity}</p>
                <p style={{ fontSize: 25 }} className='ResturantDivTopButton' onClick={() => setQuantity(quantity + 1)}>+</p>
                <p className='ResturantDivTopButton' onClick={()=>dispatch({type:'add-dish',payload:{dish,restId,quantity}})}>Add</p>
            </div>
        </div>

    )
}

// <FaPlusCircle size={30} style={{ color: '#ff5a00' }}  />
export default ResturantMenu;