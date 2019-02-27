import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        let { user } = this.props;

        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                <hr/>
                <hr/>
                <button className="home-button">Find Match</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Home);