import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.svg';
import redToken from '../assets/redToken.svg';

let socket;

class Matching extends Component {

    componentDidMount() {
        //if a user isn't valid, send them to the home screen
        if (!this.props.allState.userIsValid) {
            this.props.history.push('');
            return;
        }

        socket = io(`${process.env.REACT_APP_API_URL}/matching`);

        //see if the user's last game is ongoing
        if (this.props.allState.user.games.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/game/${this.props.allState.user.games[this.props.allState.user.games.length-1]}`)
                .then (res => {
                    //if the winner hasn't been determined, have the user join that game
                    if (res.data.winner === "none") {
                        socket.emit('disconnect');
                        this.props.updateAllState({ game: res.data });
                        this.props.history.push(`/game/${res.data._id}`);
                    }
                    //else, have the user join the lobby
                    else socket.emit('joinLobby', this.props.allState.user);
                })
        } else socket.emit('joinLobby', this.props.allState.user);

        socket.on('matched', game => {
            socket.emit('disconnect');
            this.props.updateAllState({ game: game });
            this.props.history.push(`/game/${game._id}`);
        })
    }

    goHome = () => {
        socket.emit('disconnect');
        this.props.history.push('');
    }

    render() {
        return (
            <div className="matching-screen">

                <img className='logo' src={logo} alt='logo' />

                <div className='loading-container'>
                    <div className='loading'>
                        <img src={redToken} className='token' alt='token' />
                        <div className='text'>LOOKING FOR MATCH...</div>
                    </div>
                </div>

                
                <div className='back' onClick={() => this.goHome()}>back to home</div>
                
            </div>
        );
    }
}

export default withRouter(Matching);