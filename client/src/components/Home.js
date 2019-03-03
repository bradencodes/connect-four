import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, findUser } from '../store/actions/userActions.js';

class Home extends Component {
    componentDidMount() {
        let user_id = localStorage.getItem('USER_ID');

        if (!user_id) {
            this.props.createUser();

            user_id = localStorage.getItem('USER_ID');
        }

        this.props.findUser(user_id);
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                <h6>user_id: {this.props.user_id}</h6>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.userID 
    }
}

const mapActionsToProps = { createUser, findUser };

export default connect(mapStateToProps, mapActionsToProps)(Home);