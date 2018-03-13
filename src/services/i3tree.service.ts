import { generate } from 'shortid';

export class i3Tree {

  private tree;
  private current_window = "root" ;

  constructor() {
    this.tree = new Tree();
  } 

  newTerminal(): void {
    this.current_window = this.tree.addLeaf({ type: "terminal" }, this.current_window);
  }

  stacked() {
    this.windowAction("stacked");
  }

  tabbed() {
    this.windowAction("tabbed");
  }

  verticalSplit() {
    this.windowAction("v_split");
  }

  horizonalSplit() {
    this.windowAction("h_split");
  }

  fullscreen() {

  }

  closeWindow() {
    if (this.current_window === "root") return;
    this.tree.removeLeafById(this.current_window);
  }

  private windowAction(type: string) {
    this.tree.appendLeaf(this.tree.getParent(this.current_window), { type: type })
  }


}

export class Tree {

  private leaves: ILeafMap = {};

  constructor() {
    this.leaves["root"] = { id: "root", type: "root", children: [], parent: "root" };
  }

  addLeaf(leaf: Leaf, parent?:string): string {
    if (!leaf.id) leaf.id = generate();
    if (!leaf.children) leaf.children = [];
    if (!leaf.parent && parent) leaf.parent = parent;

    this.leaves[leaf.id] = leaf;
    this.leaves[leaf.parent].children.push(leaf.id);

    return leaf.id;

  }

  appendLeaf(parent: string, leaf: Leaf) {
    let children = this.leaves[parent].children.slice();
    let id = this.addLeaf({ ...leaf, children: children }, parent);
    children.map(x => this.leaves[x].parent = id);
    this.leaves[parent].children = [id];
  }

  removeLeafById(id: string) {
    this.removeLeafChildrenById(id);
    removeElement(this.leaves[this.leaves[id].parent].children, id);
    delete this.leaves[id];
  }

  removeLeafChildrenRecursively(children: string[]) {
    children.forEach((x) => {
      if (this.leaves[x].children.length > 0)
        this.removeLeafChildrenRecursively(this.leaves[x].children);
      delete this.leaves[x];
    });
  }

  removeLeafChildrenById(id: string) {
    this.removeLeafChildrenRecursively(this.leaves[id].children);
    this.leaves[id].children = [];
  }

  removeLeaf(leaf: Leaf) {
    this.removeLeafById(leaf.id);
  }

  getLeafById(id:string): Leaf {
    return this.leaves[id];
  }

  getLeaves(): ILeafMap {
    return this.leaves;
  }

  getParent(child: string) {
    return this.leaves[child].parent;
  }

}

interface Leaf {
  id?: string;
  type?: string;
  children?: string[];
  parent?: string;
}

interface ILeafMap {
  [id: string]: Leaf
}

function removeElement(array: string[], element: string) {
  let index = array.indexOf(element)
  if (index > -1 ) return array.splice(index, 1);
}