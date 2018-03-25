import { generate } from 'shortid';
import { Tree } from './tree';

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

  getCurrentWindow(): string {
    return this.current_window;
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
    this.current_window = this.tree.addLeaf({ type: "terminal" }, this.tree.getParentIdById(this.current_window), this.current_window);
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

  setWindow(id) {

    console.log(id);

    this.current_window = id;
  }

  closeWindow() {
    if (this.current_window === "root") return;

    this.current_window = this.tree.removeLeafById(this.current_window);
    
    while(action_types.indexOf(this.tree.getLeafById(this.current_window).type) > -1 ) {
      this.current_window = this.tree.removeLeafById(this.current_window);
    }

  }

  private splitAction(type: string) {
    if ((this.tree.getParentById(this.current_window).type == "v_split" ||
          this.tree.getParentById(this.current_window).type == "h_split") && 
          this.tree.getParentById(this.current_window).children.length <= 1 )
            this.changeAction(type);
    else this.tree.appendLeaf(this.current_window, { type: type });

  }

  private changeAction(type: string) {
    this.tree.changeParent(this.current_window, { type: type });
  }

}

  