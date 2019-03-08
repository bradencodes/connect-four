import React from 'react';
import boardFront from '../../assets/boardFront.svg';
import boardBack from '../../assets/boardBack.svg';

import Col from './Col.js';

const Board = (props) => {
    return (
        <div className='board-container' >
            <div className='board' >
            
                <img src={boardBack} className='board-back' alt='boardBack' />

                <div className='columns'>
                    <Col num={1} allState={props.allState} updateAllState={props.updateAllState} />
                    <Col num={2} allState={props.allState} updateAllState={props.updateAllState}/>
                    <Col num={3} allState={props.allState} updateAllState={props.updateAllState}/>
                    <Col num={4} allState={props.allState} updateAllState={props.updateAllState}/>
                    <Col num={5} allState={props.allState} updateAllState={props.updateAllState}/>
                    <Col num={6} allState={props.allState} updateAllState={props.updateAllState}/>
                    <Col num={7} allState={props.allState} updateAllState={props.updateAllState}/>
                </div>
                
                <img src={boardFront} className='board-front' alt='boardFront' />

            </div>
        </div>
    )
}

export default Board;