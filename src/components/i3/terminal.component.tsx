import * as React from 'react';

let terminalStyle = {
  backgroundColor: "red"
}

export class Terminal extends React.Component<any, any> {
  render() {
    return <div style={{ width: this.props.width, height: this.props.height, ...terminalStyle }} key={this.props.id}>This is a {this.props.type} or something</div>
  }
}