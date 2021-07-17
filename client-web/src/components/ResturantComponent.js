import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import Loader from "react-loader-spinner";


const K_WIDTH = 30;
const K_HEIGHT = 30;

const ResturantComponent = () => {

    const location = useLocation()
    const { _id } = location.state
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
                    <img src={resturant.logo} />
                    <h1>{resturant.name}</h1>
                    <button>Show menu</button>
                </div>
                <div className="ResturantDivBottom">
                    <p>{resturant.info}</p>
                    <Map location={resturant.location} />
                </div>
            </div>
        </div>)
    }
};


const createMapOptions = (maps) => {
    return {
        zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
            style: maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControl: true
    };
}

const Map = (props) => {

    const { location } = props;
    const defaultProps = {
        center: {
            lat: 30.05991125828332,
            lng: 31.337276021755677
        },
        zoom: 15
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={createMapOptions}
            >
                {
                    location.map(item => {
                        return(<Marker
                            key={item._id}
                            lat={item.lat}
                            lng={item.lng}
                            text={item.place}
                        />)
                    })
                }
            </GoogleMapReact>
        </div>
    );
}

const Marker = ({ text }) => <div style={markerStyle}>{text}</div>;

const markerStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 8,
    fontWeight: 'bold',
    padding: 4,
    
};

export default ResturantComponent;