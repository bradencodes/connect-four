import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Home from './components/Home.js';
import Matching from './components/Matching.js';
import Game from './components/Game.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        _id: localStorage.getItem('USER_ID'),
        games: []
      },
      userIsValid: false,
      game: {},
      error: null
    }
  }

  updateAllState = (update) => {
    this.setState(update);
  }

  componentDidUpdate() {
    if (this.state.userIsValid && !this.state.game._id) {
      if (this.props.location.pathname !== '/matching') this.props.history.push('/matching');
    }
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
