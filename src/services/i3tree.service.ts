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
    this.current_window = this.tree.addLeaf({ type: "terminal" }, this.tree.getParentIdById(this.current_window));
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

  horizontalSplit() {
    this.splitAction("h_split");
  }

  fullscreen() {

  }

  goUp() {
    this.current_window = this.tree.getParentIdById(this.current_window);
  }

  closeWindow() {
    if (this.current_window === "root") return;

    this.current_window = this.tree.removeLeafById(this.current_window);
    
    while(action_types.indexOf(this.tree.getLeafById(this.current_window).type) > -1 ) {
      this.current_window = this.tree.removeLeafById(this.current_window);
    }

  }

  private splitAction(type: string) {

    if ((this.tree.getLeafById(this.current_window).type == "v_split" ||
          this.tree.getLeafById(this.current_window).type == "h_split") && 
          this.tree.getParentById(this.current_window).children.length <= 1 ) {
      return this.changeAction(type);
    }

    this.tree.appendLeaf(this.current_window, { type: type });

  }

  private changeAction(type: string) {
    this.tree.changeParent(this.current_window, { type: type });
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

  changeParent(child: string, leaf: Leaf) {
    this.getParentById(child).type = leaf.type;
  }

  appendLeaf(child: string, leaf: Leaf) {
    let id = this.addLeaf({ ...leaf, children: [ child ], parent: this.getParentIdById(child) });
    removeElement(this.getParentById(child).children, child);
    this.getLeafById(child).parent = id;
  }

  removeLeafById(id: string) {
    let siblings = this.leaves[this.getParentIdById(id)].children.slice();
    let parent = this.getParentIdById(id);
    let index = removeElement(this.leaves[this.getParentIdById(id)].children, id);
    
    this.removeLeafChildrenById(id);
    delete this.leaves[id];

    if (siblings[index]) return siblings[index];

    let originalIndex = siblings.indexOf(id);
    if (siblings[originalIndex] && parent) 
      return parent;

    return "root";

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

  getParentIdById(child: string): string {
    return this.leaves[child].parent;
  }

  getParentById(child: string): Leaf {
    return this.getLeafById(this.getParentIdById(child));
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

export function removeElement(array: string[], element: string): number {
  let index = array.indexOf(element)
  if (index > -1 ) { 
    array.splice(index, 1).slice();
    if ( array.length > 0) { 
      if ((array.length - 1) >= index) {
        return index;
      } else return (index - 1);
    } else return -1;
  } else return -1;
 }