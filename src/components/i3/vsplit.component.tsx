import * as React from 'react';

export class VSplit extends React.Component<any, any> {
  render() {
    return <div key={this.props.id}>
       { this.props.tree.children.forEach(x => {
           if (x.type == "terminal") {
             
           }
       }) }
    </div>
  }
}