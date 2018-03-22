import * as React from 'react';
import { renderGeneric } from './generic';

export class Tabbed extends React.Component<any, any> {
  render() {
    let count = this.props.tree.length;
    let width = '100%';
    let height = '100%';

    return <div key={this.props.id}> tabbed
      { 
        this.props.tree.map(x => {
          return renderGeneric(x.type, width, height, x.id, x.children);
        })
      }
    </div>
  }
}