import * as React from 'react';
import { i3Tree } from '../services/i3tree.service';

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
    this.state.i3.newTerminal();
    this.state.i3.newTerminal();
    this.state.i3.tabbed();
  }

  renderTree() {
    return (<div>
      { this.renderSection(this.state.i3.getTree().getLeafById("root")) }
    </div>)
  }

  renderSection(leaf: any) {
    if (leaf.children && leaf.children.length > 0) {
      return <div key={leaf.id}> {leaf.type} { leaf.children.map(x => {

      let tree = this.state.i3.getTree().getLeafById(x);

      if (tree.children && tree.children.length > 0) {
        return this.renderSection(tree);
      } else { 
        return <div key={tree.id}>{tree.type}</div>
        }
      }) } </div>
    }
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
    return (<div>{this.renderTree()}
        <button onClick={ this.addTerminal }>new terminal</button>
        <button onClick={ this.vsplit }>vsplit</button>
        <button onClick={ this.hsplit }>hsplit</button>
        <button onClick={ this.tab }>tab</button>
        <button onClick={ this.stack }>stack</button>
        <button onClick={ this.deleteWindow }>deleteWindow</button>
      </div>)
  }
}