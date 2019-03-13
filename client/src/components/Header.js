import React from 'react';
import logo from '../assets/logo.svg';

const Header = (props) => {
    let game = props.allState.game;
    let user = props.allState.user;

    const bannerStyle = () => {
        //if there is a winner, make the banner the same color as the winner
        if (game.winner !== 'none') {
            if (game.winner === 'tie') return {background: 'linear-gradient(90deg, rgba(212,0,0,1) 40%, rgba(51,51,51,1) 60%)'};
            if (game.winner === 'red') return {background: '#d40000'};
            return {background: '#333333'}
        }
        
        //otherwise, make it the color of the player who's turn it is
        return ({
            background: game.turn === 'red' ? '#d40000' : '#333333'
        })
    }

    const bannerText = () => {
        //if there is a winner, say who won
        if (game.winner !== 'none') {
            let winner = props.allState.game.winner;
            if (winner === 'tie') return "TIE GAME";
            if (props.allState.game[winner] === props.allState.user._id) return "YOU WIN!";
            return "OPPONENT WINS"
        }

        //otherwise, say who's turn it is
        return game[game.turn] === user._id ? "YOUR TURN" : "OPPONENT'S TURN";
    }
    
    return (
        <div className='header-container' >
            <div className='logo-container'>
                <img className='logo' src={logo} alt='logo' />
            </div>

            <div style={ bannerStyle() } className='turn-banner'>{ bannerText() }</div>
        </div>
    )
}

export default Header;