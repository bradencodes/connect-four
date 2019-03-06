import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

    componentDidMount() {
        //if the client isn't a user, create a user for the client
        if (!this.props.state.user._id) {
            axios.post(`${process.env.REACT_APP_API_URL}/user`)
                .then(res => {
                    localStorage.setItem('USER_ID', res.data._id);
                    this.props.updateState({ user: res.data, userIsValid: true, error: null });
                })
                .catch(err => {
                    console.log(err);
                    this.props.updateState({error: err});
                })
        }

        //verify the user_id is valid
        if (this.props.state.user._id && !this.props.state.userIsValid) {
            axios.get(`${process.env.REACT_APP_API_URL}/user/${this.props.state.user._id}`)
                .then(res => {
                    //if user_id is valid, set userIsValid to true
                    if (res.data._id === this.props.state.user._id) this.props.updateState({ user: res.data, userIsValid: true });

                    //else, create a valid user
                    else {
                        axios.post(`${process.env.REACT_APP_API_URL}/user`)
                            .then(res => {
                                localStorage.setItem('USER_ID', res.data._id);
                                this.props.updateState({ user: res.data, userIsValid: true, error: null });
                            })
                            .catch(err => {
                                console.log(err);
                                this.props.updateState({ error: err })
                            })
                    }
                })
                .catch(err => {
                    axios.post(`${process.env.REACT_APP_API_URL}/user`)
                        .then(res => {
                            localStorage.setItem('USER_ID', res.data._id);
                            this.props.updateState({ user: res.data, userIsValid: true, error: null });
                        })
                        .catch(err => {
                            console.log(err);
                            this.props.updateState({ error: err })
                        })
                })
        }
    }

    componentDidUpdate() {
        //see if the user's last game is ongoing
        if (this.props.state.userIsValid && this.props.state.user.games.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/game/${this.props.state.user.games[this.props.state.user.games.length-1]}`)
                .then (res => {
                    //if the winner hasn't been determined, have the user join that game
                    if (res.data.winner === "none") {
                        window.location = `/game/${res.data._id}`
                    }
                    //otherwise, have the user join matchmaking
                    else {
                        console.log("joined matchmaking");
                    }
                })
        }
        
        //if the user hasn't played any games, join matchmaking
        if (this.props.state.userIsValid && this.props.state.user.games.length === 0) {
            console.log("joined matchmaking");
        }
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                {
                    this.props.state.userIsValid ? 
                    <h6>user_id: {this.props.state.user._id}</h6> :
                    <h6>loading your info</h6>
                }
            </div>
        );
    }
}

export default Home;