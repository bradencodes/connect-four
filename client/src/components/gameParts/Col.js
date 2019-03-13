import React, { Component } from 'react';
import io from 'socket.io-client';
import redToken from '../../assets/redToken.svg';
import blackToken from '../../assets/blackToken.svg';

let socket;
let user, game, playerColor, updateAllState;

class Col extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);

        socket.emit('join room', game._id);

        socket.on('updated', updatedGame => {
            updateAllState({ game: updatedGame });
        })

        socket.on('finished', finishedGame => {
            updateAllState({ game: finishedGame });
        })
    }

    move = () => {
        let col = this.props.num;
        socket.emit('update', user._id, game._id, col);
    }


    render (){
        user = this.props.allState.user;
        game = this.props.allState.game;
        playerColor = this.props.allState.playerColor;
        updateAllState = this.props.updateAllState;

        let isTurn = game.turn === playerColor && game.winner === 'none';
        let isSpace = game[`col${this.props.num}`].length < 6;

        return (
            <div className='col' onClick={this.move} >
                
                {game[`col${this.props.num}`].map((color, i) => {
                        return <img className={`token${i}`} src={color === 'red' ? redToken : blackToken} alt='Token' 
                                key={`${this.props.num}-${i}`} />
                })}

                {isSpace && isTurn ?
                    <>
                    <img className='preview-token' src={playerColor === 'red' ? redToken : blackToken} alt='Token' />
                    <div className='highlight' />
                    </>
                    : null
                }

            </div>
        )
    }
    
}

export default Col;