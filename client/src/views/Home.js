import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, findUser } from '../store/actions/userActions.js';

class Home extends Component {
    componentDidMount() {
        let user_id = localStorage.getItem('USER_ID');

        if (user_id) {
            //check if the user has an open game
            this.props.findUser(user_id);
            // window.location = '/room/' + this.props.user_id;
        } 
        else {
            this.props.createUser();
        }
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
        user_id: state.user_id 
    }
}

export default connect(mapStateToProps, { createUser, findUser })(Home);