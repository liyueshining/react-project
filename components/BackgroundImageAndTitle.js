import React from 'react';

function BackgroundImageAndTitle(props) {
    return(
        <div className="fullImageWithTitle">
            {props.children}
        </div>
    )
}

export default BackgroundImageAndTitle
