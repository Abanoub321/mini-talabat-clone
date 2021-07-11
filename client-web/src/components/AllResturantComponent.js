import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import foodImg from '../assets/homepagefood.jpg';


const AllResturantComponent = () => {
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('')
    const [restArr, setResArr] = useState([{
        name: 'mac',
        img: foodImg
    },
    {
        name: 'kfc',
        img: foodImg
    },
    {
        name: 'abo mazen',
        img: foodImg
    },
    {
        name: 'el gamed gedan',
        img: foodImg
    },
    {
        name: 'aywa ana wad moshkla el72ooooneee',
        img: foodImg
    }])

    /*  useEffect(() => {
          if (!loading) {
              
              fetchResturants();
          }
      }, [loading])
      const fetchResturants = () =>{
           fetch(`${process.env.REACT_APP_BASE_URL}/restaurant/`)
              .then(response => response.json())
              .then(data => console.log(data));
          setLoading(true);
  
      }*/
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
                <div className="AllResturantDiv2">
                    {
                        restArr.map(resturant => {
                            return (<ResurantItem resturant={resturant} />)
                        })
                    }
                </div>
            </div>
        </div>
    );
};


const ResurantItem = (props) => {
    const { name, img } = props.resturant;

    return (
        <Link to={`/resturant/${name.replaceAll(' ', '-')}`} className="link">
            <div className="ResturantListItem">
                <img src={img} alt="Food Image"></img>
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default AllResturantComponent;