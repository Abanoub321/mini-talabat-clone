import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import Loader from "react-loader-spinner";



const ResturantComponent = () => {

    const location = useLocation()
    const { _id, name } = location.state
    const [resturant, setResturant] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/restaurant/${_id}`)
            .then(response => response.json())
            .then(data => {
                setResturant(data.resturant);
                setLoading(false);
            });
    })
   
    if (loading) {
        return (<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />)
    } else {
        return (<div className="ResturantDiv">
            <div>
                <div className="ResturantDivTop">
                    <img src={resturant.logo} alt={`${name} logo`} />
                    <h1>{resturant.name}</h1>
                    <div className ='ResturantDivTopnavbar'>
                        <Link
                            to={{
                                pathname: `/resturant/${name}/menu`,
                                state: {
                                    _id,
                                    name: name.replaceAll(' ', '-')
                                }
                            }}
                            className='ResturantDivTopButton'
                        >
                            <p>menu</p>
                        </Link>
                        <Link
                            to={{
                                pathname: `/resturant/${name}/about`,
                                state: {
                                    _id,
                                    info:resturant.info,
                                    name: name.replaceAll(' ', '-')
                                }
                            }}
                            className='ResturantDivTopButton'
                        >
                            <p>about</p>
                        </Link>
                        <Link
                            to={{
                                pathname: `/resturant/${name}/branches`,
                                state: {
                                    _id,
                                    branches:resturant.location,
                                    name: name.replaceAll(' ', '-')
                                }
                            }}
                            className='ResturantDivTopButton'
                        >
                            <p>branches</p>
                        </Link>
                    </div>
                </div>

            </div>
        </div>)
    }
};



export default ResturantComponent;