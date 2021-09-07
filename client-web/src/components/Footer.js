import React from "react";
import { SocialIcon } from 'react-social-icons';

const Navbar = () => {


    return (
        <div className="Footer">
            <div>
                <p>Website Created by:</p>
                <p>abanoub milad</p>
            </div>
            <div>
                <p>
                    Follow on
                </p>
                <div className="FollowThrough">
                    <SocialIcon url="https://www.facebook.com/abanoub.milad.75/" />
                    <SocialIcon url="https://www.instagram.com/abanoob_milad/" />
                    <SocialIcon url="https://twitter.com/abanoub321" />
                    <SocialIcon url="https://github.com/Abanoub321" />
                    <SocialIcon url="https://www.linkedin.com/in/abanoub-milad-868191111/" />
                </div>
            </div>

        </div>
    );
};

export default Navbar;