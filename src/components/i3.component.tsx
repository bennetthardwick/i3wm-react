import * as React from 'react';
import { i3Tree } from '../services/i3tree.service';

import { renderGeneric } from './i3';

import { Terminal } from './i3';

export class I3 extends React.Component {

  state;

  constructor(props) {
    super(props);
    this.state = { i3: new i3Tree() }
  }

  createDate = () => {
    this.state.i3.newTerminal();
    this.state.i3.newTerminal();
    this.state.i3.verticalSplit();
    this.state.i3.goUp();
    this.state.i3.horizontalSplit();
    this.state.i3.newTerminal();
    this.state.i3.newTerminal();
  }

  addTerminal = (e) => {
    this.state.i3.newTerminal();
    this.setState(this.state);
  }

  vsplit = (e) => {
    this.state.i3.verticalSplit();
    this.setState(this.state);
  }

  hsplit = (e) => {
    this.state.i3.horizontalSplit();
    this.setState(this.state);
  }

  tab = (e) => {
    this.state.i3.tabbed();
    this.setState(this.state);
  }

  stack = (e) => {
    this.state.i3.stacked();
    this.setState(this.state);
  }

  deleteWindow = (e) => {
    this.state.i3.closeWindow();
    this.setState(this.state);
  }

  render() {
    this.createDate();
    let tree = this.state.i3.createTree();
    console.log(tree);
    return renderGeneric(tree.type, "100%", "100%", tree.id, tree.children);
  }
}