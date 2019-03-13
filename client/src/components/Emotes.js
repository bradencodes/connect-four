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
let user, game, playerColor, updateAllState;

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
    constructor() {
        super();
        this.state = {
            myEmote: null,
            oppEmote: null
        }
    }

    componentDidMount() {
        this.setState({ myEmote: emotes[game[`${playerColor}Emote`]] });
        this.setState({ oppEmote: emotes[game[`${playerColor === 'red' ? 'black' : 'red'}Emote`]] });

        socket = io(`${process.env.REACT_APP_API_URL}/game`);

        socket.emit('join room', game._id);
    }

    changeFace() {
        const emoteArray = Object.values(emotes);
        let randomEmote = emoteArray[Math.floor(Math.random() * emoteArray.length)];
        this.setState({myEmote: randomEmote});
    }

    render (){
        user = this.props.allState.user;
        game = this.props.allState.game;
        playerColor = this.props.allState.playerColor;
        updateAllState = this.props.updateAllState;

        return (
            <div className='emotes'>
                
                <div className='emote'>
                    <div className='body' onClick={() => this.changeFace()}>
                        <img className='base' src={playerColor === 'red' ? redBase : blackBase} alt='base' />
                        <img className='my-face' src={this.state.myEmote} alt='face' />
                    </div>
                    <div className='text'>YOU</div>
                </div>

                <div className='emote'>
                    <div className='body'>
                        <img className='base' src={playerColor === 'red' ? blackBase : redBase} alt='base' />
                        <img className={this.state.oppEmote === sleep ? 'my-face' : 'opp-face'} src={this.state.oppEmote} alt='face' />
                    </div>
                    <div className='text'>OPP</div>
                </div>

            </div>
        )
    }
    
}

export default Emotes;