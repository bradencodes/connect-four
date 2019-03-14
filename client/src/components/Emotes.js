import React, { Component } from 'react';
import io from 'socket.io-client';
import redBase from '../assets/emotes/redBase.svg';
import blackBase from '../assets/emotes/blackBase.svg';
import cool from '../assets/emotes/cool.svg';
import cry from '../assets/emotes/cry.svg';
import happy from '../assets/emotes/happy.svg';
import mistake from '../assets/emotes/mistake.svg';
import mustache from '../assets/emotes/mustache.svg';
import sad from '../assets/emotes/sad.svg';
import sleep from '../assets/emotes/sleep.svg';
import smirk from '../assets/emotes/smirk.svg';

let socket;
let game, playerColor, myEmote, oppEmote;

const emotes = {
    cool: cool,
    cry: cry,
    happy: happy,
    mistake: mistake,
    mustache: mustache,
    sad: sad,
    sleep: sleep,
    smirk: smirk,
}

class Emotes extends Component {

    componentDidMount() {
        socket = io(`${process.env.REACT_APP_API_URL}/game`);

        socket.emit('join room', game._id);
    }

    changeFace(emote) {
        socket.emit('emote', playerColor, game._id, emote);
    }

    render (){
        game = this.props.allState.game;
        playerColor = this.props.allState.playerColor;
        myEmote = emotes[game[`${playerColor}Emote`]];
        oppEmote = emotes[game[`${playerColor === 'red' ? 'black' : 'red'}Emote`]];
        let emoteArray = Object.keys(emotes);

        return (
            <div className='emotes'>
                
                <div className='emote'>
                    <div className='body'>
                        <img className='base' src={playerColor === 'red' ? redBase : blackBase} alt='base' />
                        <img className='my-face' src={myEmote} alt='face' />
                    </div>
                    <div className='text'>YOU</div>
                </div>

                <div className='emote-menu'>
                    <div className='pointer' />
                    <div className='options'>
                        {emoteArray.map(emote => {
                            return (
                                <div className={myEmote === emotes[emote] ? 'option selected' : 'option'} 
                                onClick={() => this.changeFace(emote)} key={emote}>
                                    <img className='option-base' src={playerColor === 'red' ? redBase : blackBase} alt='base' />
                                    <img className='option-face' src={emotes[emote]} alt='face' />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='emote'>
                    <div className='body'>
                        <img className='base' src={playerColor === 'red' ? blackBase : redBase} alt='base' />
                        <img className={oppEmote === sleep ? 'my-face' : 'opp-face'} src={oppEmote} alt='face' />
                    </div>
                    <div className='text'>OPP</div>
                </div>

            </div>
        )
    }
    
}

export default Emotes;