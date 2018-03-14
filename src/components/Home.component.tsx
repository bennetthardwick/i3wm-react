import * as React from 'react';
import { Link } from 'react-router-dom'

export class Home extends React.Component {
    render() {
        return <div>
          <h1>Home!</h1>
          <Link to="/tree">Go to tree</Link>
        </div>
    }
}