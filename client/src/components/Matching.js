import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    componentDidMount() {
        console.log('joined matchmaking');

        //see if the user's last game is ongoing
        if (this.props.allState.user.games.length > 0) {
            axios.get(`${process.env.REACT_APP_API_URL}/game/${this.props.allState.user.games[this.props.allState.user.games.length-1]}`)
                .then (res => {
                    //if the winner hasn't been determined, have the user join that game
                    if (res.data.winner === "none") {
                        this.props.updateAllState({ game: res.data });
                        this.props.history.push(`/game/${res.data._id}`);
                    }
                })
        }
    }

    render() {
        return (
            <div className="home-screen">
                <h1>Connect 4</h1>
                <h2>Looking for match...</h2>
                <h6>user_id: {this.props.allState.user._id}</h6>
            </div>
        );
    }
}

export default withRouter(Home);