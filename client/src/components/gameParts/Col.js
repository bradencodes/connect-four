import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

class Col extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);
    }

    move = () => {
        console.log(`moved in col${this.props.num}`)
    }

    render (){
        return (
            <div className='col' onClick={() => this.move()} >
                Column: {this.props.num}: {this.props.allState.game[`col${this.props.num}`]}
            </div>
        )
    }
    
}

export default Col;