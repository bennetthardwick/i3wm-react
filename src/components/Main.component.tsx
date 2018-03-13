import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, I3 } from '.';

export class Main extends React.Component {
    render() {
        return <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/tree' component={I3} />
        </Switch>
    }
}