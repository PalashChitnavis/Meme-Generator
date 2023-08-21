/* eslint-disable no-unused-vars */
import React from "react";

function Header(){
    return(
        <>
        <div className="root">
            <div className="header-main">
            <div className="header-top">
                Meme Generator
            </div>
            <div className="header-middle">
                Create memes by uploading images or through random memes
            </div>
            <div className="header-bottom">
                <div><img className="logo-github" src="./github.svg" alt="github-logo" />&nbsp;</div>
                <div><a href="https://github.com/PalashChitnavis/meme-generator">Code on GitHub</a></div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Header ;
