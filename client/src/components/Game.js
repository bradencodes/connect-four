import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Confetti from 'react-confetti';

import Header from './Header.js';
import Board from './gameParts/Board.js';
import Footer from './Footer.js';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            width: 0, 
            height: 0 
        };
    }

    componentDidMount() {
        if (this.props.allState.userIsValid && !this.props.allState.game._id) {
            this.props.history.push('/matching');
        }

        if (!this.props.allState.userIsValid) {
            this.props.history.push('');
        }

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        let playerColor = this.props.allState.game.red === this.props.allState.user._id ? 'red' : 'black';

        this.props.updateAllState({ playerColor });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    confettiColors = () => {
        let winner = this.props.allState.game.winner;
        let blackShades = ['#333333', '#666666', '#111111']
        let redShades = ['#aa0000', '#ff5555', '#ff0000']
        let bothShades = ['#333333', '#666666', '#111111', '#aa0000', '#ff5555', '#ff0000']

        if (winner === 'red') return redShades;
        if (winner === 'black') return blackShades;
        return bothShades;
    }

    render() {
        let isGame = !!this.props.allState.game._id;
        let isWinner = isGame && this.props.allState.game.winner !== 'none';

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
                    <Footer allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(Game);