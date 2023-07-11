import React from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function ErrorMessage(props) {
    return(
        <div className='error_blur' onClick={e => { if (e.target.className === 'error_blur') props.onClose(); }}>
            <div className='Error'>
                <AiOutlineCloseCircle className='Error__close' onClick={ () => props.onClose() } />
                <h2>Error</h2>
                <p>{ props.error }</p>
            </div>
        </div>
    )
    
}