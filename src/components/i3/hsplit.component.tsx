import * as React from 'react';
import { renderGeneric } from './generic';

export class HSplit extends React.Component<any, any> {
render() {
    let count = this.props.tree.length;
    let width = `${Math.floor(100 / count).toString()}%`;
    let height = '100%';
    
    return <div key={this.props.id}> hsplit
    { 
      this.props.tree.map(x => {
        return renderGeneric(x.type, width, height, x.id, x.children);
      })
    } 
    </div>
  }
}