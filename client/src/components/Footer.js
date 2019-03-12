import React from 'react';
import io from 'socket.io-client';

let socket;

const Footer = (props) => {

    socket = io(`${process.env.REACT_APP_API_URL}/game`);

    socket.emit('join room', props.allState.game._id);

    const resign = () => {
        let winner = props.allState.game.red === props.allState.user._id ? 'black' : 'red';
        socket.emit('resign', winner, props.allState.game._id);
    }

    return (
        <div className='footer-container' >
            <div className='text'>Need to end the game early?</div>
            <div className='button' onClick={() => resign()}>RESIGN</div>
        </div>
    )
}

export default Footer;