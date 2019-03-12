import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

class Footer extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);

        socket.emit('join room', this.props.allState.game._id);
    }

    resign = () => {
        let winner = this.props.allState.game.red === this.props.allState.user._id ? 'black' : 'red';
        socket.emit('resign', winner, this.props.allState.game._id);
    }

    goHome = () => {
        this.props.history.push('');
    }

    render() {
        return (
            <div className='footer-container' >
                {this.props.allState.game.winner === 'none' ?
                    <>
                    <div className='text'>Need to end the game early?</div>
                    <div className='button' onClick={() => this.resign()}>RESIGN</div>
                    </>
                    :
                    <>
                    <div className='button' onClick={() => this.goHome()}>back to home</div>
                    </>
                }
            </div>
        )
    }
}

export default withRouter(Footer);