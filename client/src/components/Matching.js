import React, { Component } from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.svg';
import redToken from '../assets/redToken.svg';

let socket;
let user, userIsValid, updateAllState;

class Matching extends Component {

    componentDidMount() {
        //if a user isn't valid, send them to the home screen
        //this could occur if the user refreshes the page
        if (!userIsValid) {
            this.props.history.push('');
            return;
        }

        socket = io(`${process.env.REACT_APP_API_URL}/matching`);

        socket.emit('joinLobby', user);

        socket.on('matched', game => {
            socket.emit('leave');
            updateAllState({ game: game });
            this.props.history.push(`/game/${game._id}`);
        })
    }

    componentWillUnmount() {
        if (socket) socket.emit('leave');
    }

    goHome = () => {
        socket.emit('leave');
        this.props.history.push('');
    }

    render() {
        user = this.props.allState.user;
        userIsValid = this.props.allState.userIsValid;
        updateAllState = this.props.updateAllState;

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