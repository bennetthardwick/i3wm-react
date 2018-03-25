import * as React from 'react';

let terminalStyle = {
  backgroundColor: "red",
  border: "solid black 1px",
  boxSizing: "border-box"
}

export class Terminal extends React.Component<any, any> {
  render() {
    return <div onMouseEnter={() => this.props.setWindow(this.props.id)} style={{ width: this.props.width, height: this.props.height, ...terminalStyle }} >{this.props.id}</div>
  }
}