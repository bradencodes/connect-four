import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userID: localStorage.getItem('USER_ID'),
            userIsValid: false,
            error: null
        }
    }

    componentDidMount() {
        //if the client isn't a user, create a user for the client
        if (!this.state.userID) {
            axios.post(`${process.env.REACT_APP_API_URL}/user`)
                .then(res => {
                    localStorage.setItem('USER_ID', res.data._id);
                    this.setState({ userID: localStorage.getItem('USER_ID'), userIsValid: true, error: null });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({error: err})
                })
        }

        //verify the user_id is valid
        if (this.state.userID && !this.state.userIsValid) {
            axios.get(`${process.env.REACT_APP_API_URL}/user?_id=${this.state.userID}`)
                .then(res => {
                    //if user_id is valid, set userIsValid to true
                    if (res.data) this.setState({ userIsValid: true });

                    //else, create a valid user
                    else {
                        axios.post(`${process.env.REACT_APP_API_URL}/user`)
                            .then(res => {
                                localStorage.setItem('USER_ID', res.data._id);
                                this.setState({ userID: localStorage.getItem('USER_ID'), userIsValid: true, error: null });
                            })
                            .catch(err => {
                                console.log(err);
                                this.setState({ error: err })
                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({...this.state, error: err})
                })
        }
        
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                <h6>user_id: {this.state.userID}</h6>
            </div>
        );
    }
}

export default Home;