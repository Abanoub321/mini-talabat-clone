import React from "react";
import { Redirect } from "react-router-dom";

const CheckoutComponent = ({ userName, order }) => {

    if (userName == '') {
        return <Redirect to='/' />
    }
    else {
        if (order.length == 0) {
            return (
                <div className='checkout'>
                    <h1>We are Waiting you to order</h1>
                </div>
            )
        } else {
            console.log(order);
            return (
                <div className='checkout'>
                    <h1>Your Checkout</h1>
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                        {
                            order.map(element => {
                                return(
                                    <tr key={element._id}>
                                        <td>{element.name}</td>
                                        <td> {element.price} </td>
                                        <td> {element.quantity} </td>
                                        <td> {element.price * element.quantity} </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    <button>place order</button>
                </div>
            );
        }
    }
};

export default CheckoutComponent;