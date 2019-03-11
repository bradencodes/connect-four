import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.svg';
import redToken from '../assets/redToken.svg';
import blackToken from '../assets/blackToken.svg';

class Home extends Component {

    componentDidMount() {
        //if the client isn't a user, create a user for the client
        if (!this.props.allState.user._id) {
            axios.post(`${process.env.REACT_APP_API_URL}/user`)
                .then(res => {
                    localStorage.setItem('USER_ID', res.data._id);
                    this.props.updateAllState({ user: res.data, userIsValid: true, error: null });
                })
                .catch(err => {
                    console.log(err);
                    this.props.updateAllState({error: err});
                })
        }

        //verify the user_id is valid
        if (this.props.allState.user._id && !this.props.allState.userIsValid) {
            axios.get(`${process.env.REACT_APP_API_URL}/user/${this.props.allState.user._id}`)
                .then(res => {
                    //if user_id is valid, set userIsValid to true
                    if (res.data._id === this.props.allState.user._id) this.props.updateAllState({ user: res.data, userIsValid: true });

                    //else, create a valid user
                    else {
                        axios.post(`${process.env.REACT_APP_API_URL}/user`)
                            .then(res => {
                                localStorage.setItem('USER_ID', res.data._id);
                                this.props.updateAllState({ user: res.data, userIsValid: true, error: null });
                            })
                            .catch(err => {
                                console.log(err);
                                this.props.updateAllState({ error: err })
                            })
                    }
                })
                .catch(err => {
                    axios.post(`${process.env.REACT_APP_API_URL}/user`)
                        .then(res => {
                            localStorage.setItem('USER_ID', res.data._id);
                            this.props.updateAllState({ user: res.data, userIsValid: true, error: null });
                        })
                        .catch(err => {
                            console.log(err);
                            this.props.updateAllState({ error: err })
                        })
                })
        }
    }

    componentDidUpdate() {
        //if the user is in an open game, send the user to that endpoint
        if (this.props.allState.user.games.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/game/${this.props.allState.user.games[this.props.allState.user.games.length-1]}`)
                .then (res => {
                    //if the winner hasn't been determined, have the user join that game
                    if (res.data.winner === "none") {
                        this.props.updateAllState({ game: res.data });
                        this.props.history.push(`/game/${res.data._id}`);
                    }
            })
        };
    }

    goToMatching = () => {
        this.props.history.push('/matching');
    }

    render() {
        return (
            <div className="home-screen">

                <img className='logo' src={logo} alt='logo' />

                <div className='options'>
                    <div className='option' onClick={() => this.goToMatching()}>
                        <img src={redToken} className='token' alt='token' />
                        <div className='text'>PLAY GAME</div>
                    </div>
                    <div className='option'>
                        <img src={blackToken} className='token' alt='token' />
                        <div className='text'>SPECTATE</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);