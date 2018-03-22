import * as React from 'react';
import { renderGeneric } from './generic';

export class VSplit extends React.Component<any, any> {
  render() {
    let count = this.props.tree.length;
    let width = '100%';
    let height = `${Math.floor(100 / count).toString()}%`;

    console.log(height);

    return <div key={this.props.id}> vsplit
      { 
        this.props.tree.map(x => {
          return renderGeneric(x.type, width, height, x.id, x.children);
        })
      }
    </div>
  }
}