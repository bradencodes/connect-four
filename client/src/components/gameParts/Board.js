import React from 'react';

import Col from './Col.js';

const Board = (props) => {
    return (
        <div className='board' >
            <Col num={1} allState={props.allState} updateAllState={props.updateAllState} />
            <Col num={2} allState={props.allState} updateAllState={props.updateAllState}/>
            <Col num={3} allState={props.allState} updateAllState={props.updateAllState}/>
            <Col num={4} allState={props.allState} updateAllState={props.updateAllState}/>
            <Col num={5} allState={props.allState} updateAllState={props.updateAllState}/>
            <Col num={6} allState={props.allState} updateAllState={props.updateAllState}/>
            <Col num={7} allState={props.allState} updateAllState={props.updateAllState}/>
        </div>
    )
}

export default Board;