import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                _id: localStorage.getItem('USER_ID'),
                games: []
            },
            userIsValid: false,
            error: null
        }
    }

    componentDidMount() {
        //if the client isn't a user, create a user for the client
        if (!this.state.user._id) {
            axios.post(`${process.env.REACT_APP_API_URL}/user`)
                .then(res => {
                    localStorage.setItem('USER_ID', res.data._id);
                    this.setState({ user: res.data, userIsValid: true, error: null });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({error: err})
                })
        }

        //verify the user_id is valid
        if (this.state.user._id && !this.state.userIsValid) {
            axios.get(`${process.env.REACT_APP_API_URL}/user/${this.state.user._id}`)
                .then(res => {
                    //if user_id is valid, set userIsValid to true
                    if (res.data._id === this.state.user._id) this.setState({ user: res.data, userIsValid: true });

                    //else, create a valid user
                    else {
                        axios.post(`${process.env.REACT_APP_API_URL}/user`)
                            .then(res => {
                                localStorage.setItem('USER_ID', res.data._id);
                                this.setState({ user: res.data, userIsValid: true, error: null });
                            })
                            .catch(err => {
                                console.log(err);
                                this.setState({ error: err })
                            })
                    }
                })
                .catch(err => {
                    axios.post(`${process.env.REACT_APP_API_URL}/user`)
                        .then(res => {
                            localStorage.setItem('USER_ID', res.data._id);
                            this.setState({ user: res.data, userIsValid: true, error: null });
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({ error: err })
                        })
                })
        }
    }

    componentDidUpdate() {
        //see if the user's last game is ongoing
        if (this.state.userIsValid && this.state.user.games.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/game/${this.state.user.games[this.state.user.games.length-1]}`)
                .then (res => {
                    //if the winner hasn't been determined, have the user join that game
                    if (res.data.winner === "none") {
                        console.log("joined ongoing game");
                    }
                    //otherwise, have the user join matchmaking
                    else {
                        console.log("joined matchmaking");
                    }
                })
        }
        
        //if the user hasn't played any games, join matchmaking
        if (this.state.userIsValid && this.state.user.games.length === 0) {
            console.log("joined matchmaking");
        }
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                {
                    this.state.userIsValid ? 
                    <h6>user_id: {this.state.user._id}</h6> :
                    <h6>loading your info</h6>
                }
            </div>
        );
    }
}

export default Home;