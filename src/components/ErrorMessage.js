import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function ErrorMessage(props) {
    return(
        <div className='popUp_blur' onClick={e => {
            if (e.target.className === 'popUp_blur') props.onClose()
        }}>
            <div className='Error'>
                <AiOutlineCloseCircle className='Error__close' onClick={ () => props.onClose() } />
                <h2>Error</h2>
                <p>{ props.error }</p>
            </div>
        </div>
    )
    
}