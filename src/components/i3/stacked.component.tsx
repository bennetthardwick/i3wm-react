import * as React from 'react';

import { renderGeneric } from './generic';

export class Stacked extends React.Component<any, any> {
  render() {
    let count = this.props.tree.length;
    let width = '100%';
    let height = '100%';
    
    return <div style={{ width: this.props.width, height: this.props.height}} key={this.props.id}>
      {
        this.props.tree.map(x => {
          return renderGeneric(x.type, width, height, x.id, x.children);
        })
      }
    </div>
  }
}