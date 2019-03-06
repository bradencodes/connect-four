import React, { Component } from 'react';
import axios from 'axios';

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

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                {
                    this.props.allState.userIsValid ? 
                    <h6>user_id: {this.props.allState.user._id}</h6> :
                    <h6>loading your info</h6>
                }
            </div>
        );
    }
}

export default Home;