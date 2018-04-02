import { generate } from 'shortid';

export class Tree {

  private leaves: ILeafMap = {};

  constructor() {
    this.leaves["root"] = { id: "root", type: "root", children: [], parent: "root" };
  }

  addLeaf(leaf: Leaf, parent?:string, sibling?: string, before?: boolean): string {
    if (!leaf.id) leaf.id = generate();
    if (!leaf.children) leaf.children = [];
    if (!leaf.parent && parent) leaf.parent = parent;
    if (!before) before = false;

    this.leaves[leaf.id] = leaf;

    if (sibling) {

      let index = this.leaves[leaf.parent].children.indexOf(sibling);

      if (!before) index++;

      if (index >= 0) {
        this.leaves[leaf.parent].children.splice(index, 0, leaf.id);
        return leaf.id;
      }
    }
    
    this.leaves[leaf.parent].children.push(leaf.id);

    return leaf.id;

  }

  changeParent(child: string, leaf: Leaf) {
    this.getParentById(child).type = leaf.type;
  }

  appendLeaf(child: string, leaf: Leaf) {
    let id = this.addLeaf({ ...leaf, children: [ child ]}, this.getParentIdById(child), child, true);
    removeElement(this.getParentById(child).children, child);
    this.getLeafById(child).parent = id;
  }

  removeLeafById(id: string) {
    let siblings = this.leaves[this.getParentIdById(id)].children;
    let parent = this.getParentIdById(id);
    let index = removeElement(this.leaves[this.getParentIdById(id)].children, id);

    this.removeLeafChildrenById(id);
    delete this.leaves[id];

    if (siblings[index]) return siblings[index];
    if (siblings.length > 0) return siblings[siblings.length - 1];
    if (parent) return parent;

    //return "root";

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
    array.splice(index, 1);
    if ( array.length > 0) { 
      if ((array.length - 1) >= index) {
        return index;
      } else return (index - 1);
    } else return -1;
  } else return -1;
 }