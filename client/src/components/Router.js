import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../views/Home.js';

class Router extends Component {
    render(){
        return(
            <Switch>
                <Route exact path="/" component={home} />
            </Switch>
        );
    }
}

export default Router;