import React, {useState} from 'react'
import { Link } from "react-router-dom";
import foodImg from '../assets/homepagefood.jpg';



const HomePageComponent = () => {
    const [text,setText] = useState('')
  
    const onBtnClicked = () =>{
        
    }

    return (
        <div className="HomePageCenterDiv">
            <p>Order Online Food From Here</p>
            <div>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <Link to="/all" className="HomePagButton" onClick={onBtnClicked}>Let's Go</Link>
            </div>
            <img src={foodImg} alt="Food Image"></img>
        </div>
    );
};

export default HomePageComponent;