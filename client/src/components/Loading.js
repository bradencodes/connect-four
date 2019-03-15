import React from 'react';
import blackToken from '../assets/blackToken.svg';

const Loading = (props) => {
    return (
        <div className='loading-container' >
            <div className='loading-container'>
                <div className='loading'>
                    <img src={blackToken} className='token' alt='token' />
                    <div className='text'>LOADING...</div>
                </div>
            </div>
        </div>
    )
}

export default Loading;