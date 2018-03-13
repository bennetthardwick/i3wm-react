import * as React from 'react';
import { i3Tree } from '../services/i3tree.service';

export class I3 extends React.Component {

  private i3 = new i3Tree();

  createDate() {
    this.i3.newTerminal();
    this.i3.newTerminal();
    this.i3.verticalSplit();
    this.i3.goUp();
    this.i3.newTerminal();
    this.i3.newTerminal();
    this.i3.verticalSplit();

    console.log(JSON.stringify(this.i3.createTree(), null, 2));

  }

  renderTree() {
    this.createDate();
    return (<div> Root:
      { this.renderSection(this.i3.getTree().getLeafById("root")) }
    </div>)
  }

  renderSection(leaf: any) {
    if (leaf.children && leaf.children.length > 0) {
      return <div key={leaf.id}> {leaf.type} { leaf.children.map(x => {

      let tree = this.i3.getTree().getLeafById(x);

      if (tree.children && tree.children.length > 0) {
        return this.renderSection(tree);
      } else { 
        return <div key={tree.id}>{tree.type}</div>
        }
      }) } </div>
    } else {
      return "hey"
    }
  }

  render() {
    return <div>{this.renderTree()}</div>
  }
}