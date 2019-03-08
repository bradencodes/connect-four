import React, { Component } from 'react';
import io from 'socket.io-client';
import redToken from '../../assets/redToken.svg';
import blackToken from '../../assets/blackToken.svg';

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
        let game_id = this.props.allState.game._id;
        let col = this.props.num;
        socket.emit('update', player_id, game_id, col);
    }


    render (){
        let { playerColor } = this.props.allState;
        let isTurn = this.props.allState.game.turn === playerColor;
        let isSpace = this.props.allState.game[`col${this.props.num}`].length < 6;

        return (
            <div className='col' onClick={this.move} >
                
                {this.props.allState.game[`col${this.props.num}`].map(color => {
                        return <img className='token' src={color === 'red' ? redToken : blackToken} alt='Token' />
                })}

                {isSpace && isTurn ? 
                    <img className='preview-token' src={playerColor === 'red' ? redToken : blackToken} alt='Token' />
                    : null
                }

            </div>
        )
    }
    
}

export default Col;