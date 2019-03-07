import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

let socket;

class Game extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);
        
        if (!this.props.allState.userIsValid) {
            this.props.history.push('');
        }
        
        console.log('joined game');
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                <h2>Game: {this.props.allState.game._id}</h2>
                <h6>player1: {this.props.allState.game.red}</h6>
                <h6>player2: {this.props.allState.game.black}</h6>
            </div>
        );
    }
}

export default withRouter(Game);