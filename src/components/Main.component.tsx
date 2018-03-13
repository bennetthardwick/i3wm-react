import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '.';

export class Main extends React.Component {
    render() {
        return <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
    }
}