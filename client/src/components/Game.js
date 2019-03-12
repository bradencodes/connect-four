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
        let isWinner = isGame && this.props.allState.game.winner !== 'none';

        return (
            <div className="game-container">
                {isWinner ? 
                    <div className='confetti'>
                        <Confetti />
                    </div>
                    : null
                }
                {isGame ?
                    <>
                    <Header allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    <Board allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    <Footer allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(Game);