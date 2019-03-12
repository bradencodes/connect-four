import React from 'react';
import logo from '../assets/logo.svg';

const Header = (props) => {
    let isGame = !!props.allState.game._id;
    let isWinner = isGame && props.allState.game.winner !== 'none';
    let isTurn = isGame ? props.allState.game.turn : null;
    const turnBannerStyle = () => {
        if (isWinner) {
            let winner = props.allState.game.winner;
            if (winner === 'tie') return {background: 'linear-gradient(90deg, rgba(212,0,0,1) 40%, rgba(51,51,51,1) 60%)'};
            if (winner === 'red') return {background: '#d40000'};
            return {background: '#333333'}
        }
        
        return ({
        background: isTurn === 'red' ? '#d40000' : '#333333'
        })
    }

    const bannerText = () => {
        if (isWinner) {
            let winner = props.allState.game.winner;
            if (winner === 'tie') return "TIE GAME";
            if (props.allState.game[winner] === props.allState.user._id) return "YOU WIN!";
            return "OPPONENT WINS"
        }

        return props.allState.game[isTurn] === props.allState.user._id 
                ? "YOUR TURN" : "OPPONENT'S TURN";
    } 
    return (
        <div className='header-container' >
            <div className='logo-container'>
                <img className='logo' src={logo} alt='logo' />
            </div>

            <div style={ turnBannerStyle() } className='turn-banner'>{bannerText()}</div>
        </div>
    )
}

export default Header;