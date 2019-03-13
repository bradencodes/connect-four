import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Confetti from 'react-confetti';

import Header from './Header.js';
import Board from './gameParts/Board.js';
import Emotes from './Emotes.js';
import Footer from './Footer.js';

let game, userIsValid, updateAllState;

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0 
        };
    }

    componentDidMount() {
        if (!userIsValid) {
            this.props.history.push('');
        }

        //invalidate the user after confirming validation so that user will have to validate if
        // directed away from the game
        updateAllState({ userIsValid: false });

        //add a listener to update the window dimensions so confetti will always fill screen
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        //store the player's color in their current game
        let playerColor = this.props.allState.game.red === this.props.allState.user._id ? 'red' : 'black';

        updateAllState({ playerColor });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    //change the color of the confetti based on the winner
    confettiColors = () => {
        let blackShades = ['#333333', '#666666', '#111111'];
        let redShades = ['#aa0000', '#ff5555', '#ff0000'];
        let bothShades = ['#333333', '#666666', '#111111', '#aa0000', '#ff5555', '#ff0000'];

        if (game.winner === 'red') return redShades;
        if (game.winner === 'black') return blackShades;
        return bothShades;
    }

    render() {
        game = this.props.allState.game;
        userIsValid = this.props.allState.userIsValid;
        updateAllState = this.props.updateAllState;

        let isGame = !!game._id;
        let isWinner = isGame && game.winner !== 'none';

        return (
            <div className="game-container">
                {isWinner ? 
                    <div className='confetti'>
                        <Confetti width={this.state.width} height={this.state.height}
                        colors={ this.confettiColors() }/>
                    </div>
                    : null
                }
                {isGame ?
                    <>
                    <Header allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    <Board allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    <Emotes allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    <Footer allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(Game);