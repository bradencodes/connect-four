import React from 'react';
import logo from '../assets/logo.svg';

const Header = (props) => {
    let isGame = !!props.allState.game._id;
    let isWinner = isGame && props.allState.game.winner !== 'none';
    let isTurn = isGame ? props.allState.game.turn : null;
    let bannerText = props.allState.game[isTurn] === props.allState.user._id 
                        ? "YOUR TURN" : "OPPONENT'S TURN";
    let turnBannerStyle = {
        background: isTurn === 'red' ? '#d40000' : '#333333'
    }
    return (
        <div className='header-container' >
            <img className='logo' src={logo} alt='logo' />

            <div style={ turnBannerStyle } className='turn-banner'>{bannerText}</div>
        </div>
    )
}

export default Header;