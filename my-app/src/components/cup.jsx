import React from 'react'
import './cup.css';

const Cup = (props) => {
    return (
        <>
            <h1>{props.message}</h1>
            <div class="drop-container">
                <div class="drop"></div>
            </div>
        </>


    )
}

export default Cup