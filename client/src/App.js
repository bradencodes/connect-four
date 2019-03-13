import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './styles/css/index.css';

import Home from './components/Home.js';
import Matching from './components/Matching.js';
import Game from './components/Game.js';

class App extends Component {
  constructor() {
    super();
    //pass down this state for all components to use
    this.state = {
      user: {
        _id: localStorage.getItem('USER_ID'),
        games: []
      },
      userIsValid: false,
      game: {},
      playerColor: null,
      error: null
    }
  }

  //pass down this function so components can update the state
  updateAllState = (update) => {
    this.setState(update);
  }

  render() {
    return (
      <div className='App'>

        <Route exact path="/" render={ (props) => { 
          return(<Home {...props} allState={this.state} updateAllState={this.updateAllState} />) 
        }} />

        <Route path="/matching" render={ (props) => { 
          return(<Matching {...props} allState={this.state} updateAllState={this.updateAllState} />) 
        }} />

        <Route path="/game/:id" render={ (props) => { 
          return(<Game {...props} allState={this.state} updateAllState={this.updateAllState} />) 
        }} />

      </div>
    );
  }
};

export default withRouter(App);
