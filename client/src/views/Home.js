import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {
    componentDidMount() {
        let user_id = localStorage.getItem('USER_ID');

        if (user_id) {
            //check if the user has an open game
            axios.get(`${process.env.REACT_APP_API_URL}/user?_id=${user_id}`) 
                .then(res => {
                    console.log('user: ', res.data);
                })
        } 
        else {
            axios.post(`${process.env.REACT_APP_API_URL}/user`)
                .then(res => {
                    localStorage.setItem('USER_ID', res.data._id);
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Home);