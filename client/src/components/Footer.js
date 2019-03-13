import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

let socket;
let user, game;

class Footer extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);

        socket.emit('join room', game._id);
    }

    resign = () => {
        let winner = game.red === user._id ? 'black' : 'red';
        socket.emit('resign', winner, game._id);
    }

    goHome = () => {
        this.props.history.push('');
    }

    render() {
        user = this.props.allState.user;
        game = this.props.allState.game;

        return (
            <div className='footer-container' >
                {game.winner === 'none' ?
                    <>
                    <div className='text'>Need to end the game early?</div>
                    <div className='button' onClick={() => this.resign()}>RESIGN</div>
                    </>
                    :
                    <div className='button' onClick={() => this.goHome()}>back to home</div>
                }
            </div>
        )
    }
}

export default withRouter(Footer);