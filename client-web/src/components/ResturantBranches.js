import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const K_WIDTH = 30;
const K_HEIGHT = 30;


const ResturantBranches = () => {
    const location = useLocation()
    const { _id, branches } = location.state

    return (
        <div className="ResturantDivBottom">
            <h1>Our Branches</h1>
            <ol className='branchDiv'>

                {
                    branches.map(branch => {
                        return (
                            <li key={branch._id}>{branch.place}</li>
                        )
                    })
                }

            </ol>
            <Map location={branches} />
        </div>
    );
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
        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={createMapOptions}
            >
                {
                    location.map(item => {
                        return (<Marker
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

export default ResturantBranches;