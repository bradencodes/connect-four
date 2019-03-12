import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Confetti from 'react-confetti';

import Header from './Header.js';
import Board from './gameParts/Board.js';
import Footer from './Footer.js';

class Game extends Component {

    componentDidMount() {
        if (this.props.allState.userIsValid && !this.props.allState.game._id) {
            this.props.history.push('/matching');
        }


        if (!this.props.allState.userIsValid) {
            this.props.history.push('');
        }

        let playerColor = this.props.allState.game.red === this.props.allState.user._id ? 'red' : 'black';

        this.props.updateAllState({ playerColor });
    }

    render() {
        let isGame = !!this.props.allState.game._id;
        let isTurn = isGame ? this.props.allState.game.turn : null;
        let bannerText = this.props.allState.game[isTurn] === this.props.allState.user._id 
                            ? "YOUR TURN" : "OPPONENT'S TURN";
        let turnBannerStyle = {
            background: isTurn === 'red' ? '#d40000' : '#333333'
        }
        let isWinner = isGame && this.props.allState.game.winner !== 'none';

        return (
            <div className="game-container">
                {isGame ?
                    <>
                    <Header />
                    <div style={ turnBannerStyle } className='turn-banner'>{bannerText}</div>
                    <Board allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    <Footer allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    </>
                    : null
                }
                {isWinner ? 
                    <Confetti />
                    : null
                }
            </div>
        );
    }
}

export default withRouter(Game);