import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;

class Col extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);

        socket.on('updated', updatedGame => {
            this.props.updateAllState({game: updatedGame});
        })

        socket.on('finished', finishedGame => {
            this.props.updateAllState({game: finishedGame});
        })
    }

    move = () => {
        let player_id = this.props.allState.user._id;
        console.log('player_id: ', player_id);
        let game_id = this.props.allState.game._id;
        console.log('game_id: ', game_id);
        let col = this.props.num;
        console.log('col: ', col);
        socket.emit('update', player_id, game_id, col);
    }

    render (){
        return (
            <div className='col' onClick={this.move} >
                Column: {this.props.num}: {this.props.allState.game[`col${this.props.num}`]}
            </div>
        )
    }
    
}

export default Col;