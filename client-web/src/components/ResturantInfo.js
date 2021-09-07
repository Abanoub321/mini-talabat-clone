import React from "react";
import { useLocation } from "react-router-dom";

const ResturantInfo = () => {
    const location = useLocation()
    const { info } = location.state
   
    return (
        <div className="ResturantDivBottom">
          <h1>Info</h1>
          <p>{info}</p>
        </div>
    );
};

export default ResturantInfo;