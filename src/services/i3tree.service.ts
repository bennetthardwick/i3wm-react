import { generate } from 'shortid';

let action_types = [ "stacked", "h_split", "v_split", "tabbed" ];

export class i3Tree {

  private tree;
  private current_window = "root" ;

  constructor() {
    this.tree = new Tree();
  } 

  getTree() {
    return this.tree;
  }

  createTree() {

    let tree = { id: "root", type: "root", children: [] };

    var recurse = (_tree) => {
      let leaf = this.tree.getLeafById(_tree.id);
      if (leaf.children.length > 0) {
        leaf.children.map((x,y) => {
          let i = this.tree.getLeafById(x);

          _tree.children[y] = { id: i.id, type: i.type, children: [] };
          recurse(_tree.children[y]);

        });
      }
    }

    recurse(tree);

    return tree;

  }

  newTerminal(): void {
    this.current_window = this.tree.addLeaf({ type: "terminal" }, this.tree.getParent(this.current_window));
  }

  stacked() {
    this.changeAction("stacked");
  }

  tabbed() {
    this.changeAction("tabbed");
  }

  verticalSplit() {
    this.splitAction("v_split");
  }

  horizonalSplit() {
    this.splitAction("h_split");
  }

  fullscreen() {

  }

  goUp() {
    this.current_window = this.tree.getParent(this.current_window);
  }

  closeWindow() {
    if (this.current_window === "root") return;
    this.tree.removeLeafById(this.current_window);
  }

  private splitAction(type: string) {
    this.tree.appendLeaf(this.current_window, { type: type });
  }

  private changeAction(type: string) {
    this.tree.changeLeaf(this.current_window, { type: type });
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

  changeLeaf(child: string, leaf: Leaf) {
    this.getLeafById(this.getParent(child)).type = leaf.type;
  }

  appendLeaf(child: string, leaf: Leaf) {

    if (this.getLeafById(this.getParent(child)).children.length <= 1) return;

    let id = this.addLeaf({ ...leaf, children: [child], parent: this.getParent(child) });
    removeElement(this.getLeafById(this.getParent(child)).children, child);
    this.getLeafById(child).parent = id;
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