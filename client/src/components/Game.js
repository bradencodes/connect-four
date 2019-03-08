import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Board from './gameParts/Board.js';

class Game extends Component {

    componentDidMount() {        
        if (!this.props.allState.userIsValid) {
            this.props.history.push('');
        }

        let playerColor = this.props.allState.game.red === this.props.allState.user._id ? 'red' : 'black';

        this.props.updateAllState({ playerColor });
    }

    render() {
        return (
            <div className="home-screen">
                {this.props.allState.game._id ?
                    <>
                    <h1>Connect 4</h1>
                    <h2>Game: {this.props.allState.game._id}</h2>
                    <h6>player1: {this.props.allState.game.red}</h6>
                    <h6>player2: {this.props.allState.game.black}</h6>
                    <Board allState={this.props.allState} updateAllState={this.props.updateAllState}/>
                    </>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(Game);