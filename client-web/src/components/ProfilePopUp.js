import React from "react";
import Popup from 'reactjs-popup';

const ProfilePopUp = ({ profileName , dispatch }) => {

    return (
        <Popup
            trigger={
                <p className="menu">
                    {profileName.charAt(0).toUpperCase() + profileName.slice(1)}
                </p>
            }
            on="hover"
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            
            arrow={false}
            position={['bottom right']}
            closeOnDocumentClick
        >
            <div className="menu">
                <div className="menu-item">See Profile</div>
                <div className="menu-item" onClick={()=> dispatch({type:'logout'})}> Log Out</div>
                
            </div>
        </Popup>
    );
};

export default ProfilePopUp;
