import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        _id: localStorage.getItem('USER_ID'),
        games: []
      },
      userIsValid: false,
      error: null
    }
  }

  updateState = (update) => {
    this.setState(update);
  }

  render() {
    return (
      <Router>
        <Route exact path="/" render={ (props) => { 
          return(<Home {...props} state={this.state} updateState={this.updateState} />) 
        }} />
      </Router>
    );
  }
};

export default App;
