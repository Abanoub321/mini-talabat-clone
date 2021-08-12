import React , {useEffect} from "react";
import { Link, useLocation } from "react-router-dom";

const ResturantInfo = () => {
    const location = useLocation()
    const { _id, info } = location.state
   
    return (
        <div className="ResturantDivBottom">
          <h1>Info</h1>
          <p>{info}</p>
        </div>
    );
};

export default ResturantInfo;