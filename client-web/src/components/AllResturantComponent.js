import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";


const AllResturantComponent = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('')
    const [restArr, setResArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);

    useEffect(() => {
        if (!loading) {
            fetchResturants();

        }
    }, [loading]);

    useEffect(() => {
        setSearchArr(restArr.filter(rest => {
            return rest.name.includes(searchText);
        }));
    }, [searchText]);
    const fetchResturants = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/restaurant/`)
            .then(response => response.json())
            .then(data => {

                setResArr(data.resturants);
                setLoading(true);
            });

    }
    return (
        <div className="AllResturantDiv">
            <div className="AllResturantDiv1">
                <h1>All Resturants</h1>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search Resturants"
                />
                {
                    !loading ? (<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />) : (<div className="AllResturantDiv2">
                        {
                            (searchText == '' ? restArr : searchArr).map(resturant => {
                                return (<ResurantItem resturant={resturant} key={resturant._id} />)
                            })
                        }
                    </div>)
                }

            </div>
        </div>
    );
};


const ResurantItem = (props) => {
    const { name, logo , _id } = props.resturant;

    return (
        <Link to={{
            pathname: `/resturant/${name.replaceAll(' ', '-')}`,
            state: {
               _id
              },
        }
        
        } className="link">
            <div className="ResturantListItem">
                <img src={logo} alt={name + ' image'}></img>
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default AllResturantComponent;