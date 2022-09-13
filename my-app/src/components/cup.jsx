import React from 'react'
import './cup.css';

const Cup = (props) => {
    return (
        <>
            <div id='cupMessage'>{props.message}</div>
            <div class="drop-container">
                <div class="drop"></div>
            </div>
        </>


    )
}

export default Cup