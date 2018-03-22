import * as React from 'react';

let terminalStyle = {
  backgroundColor: "red"
}

export class Terminal extends React.Component<any, any> {
  render() {
    return <div style={{ width: this.props.width, height: this.props.height, ...terminalStyle }} key={this.props.id}>It's a: {this.props.type}</div>
  }
}