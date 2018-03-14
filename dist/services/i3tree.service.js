"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = require("shortid");
let action_types = ["stacked", "h_split", "v_split", "tabbed"];
class i3Tree {
    constructor() {
        this.current_window = "root";
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
                leaf.children.map((x, y) => {
                    let i = this.tree.getLeafById(x);
                    _tree.children[y] = { id: i.id, type: i.type, children: [] };
                    recurse(_tree.children[y]);
                });
            }
        };
        recurse(tree);
        return tree;
    }
    newTerminal() {
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
    horizontalSplit() {
        this.splitAction("h_split");
    }
    fullscreen() {
    }
    goUp() {
        this.current_window = this.tree.getParent(this.current_window);
    }
    closeWindow() {
        if (this.current_window === "root")
            return;
        this.tree.removeLeafById(this.current_window);
        // TODO, SET CURRENT WINDOW TO NEXT CHJILD
    }
    splitAction(type) {
        this.tree.appendLeaf(this.current_window, { type: type });
    }
    changeAction(type) {
        this.tree.changeLeaf(this.current_window, { type: type });
    }
}
exports.i3Tree = i3Tree;
class Tree {
    constructor() {
        this.leaves = {};
        this.leaves["root"] = { id: "root", type: "root", children: [], parent: "root" };
    }
    addLeaf(leaf, parent) {
        if (!leaf.id)
            leaf.id = shortid_1.generate();
        if (!leaf.children)
            leaf.children = [];
        if (!leaf.parent && parent)
            leaf.parent = parent;
        this.leaves[leaf.id] = leaf;
        this.leaves[leaf.parent].children.push(leaf.id);
        return leaf.id;
    }
    changeLeaf(child, leaf) {
        this.getLeafById(this.getParent(child)).type = leaf.type;
    }
    appendLeaf(child, leaf) {
        if (!(action_types.indexOf(leaf.type) > -1) && this.getLeafById(this.getParent(child)).children.length <= 1)
            return;
        if (action_types.indexOf(leaf.type) > -1 && action_types.indexOf(this.getLeafById(this.getParent(child)).type) > -1) {
            this.changeLeaf(child, leaf);
        }
        else {
            let id = this.addLeaf(Object.assign({}, leaf, { children: [child], parent: this.getParent(child) }));
            removeElement(this.getLeafById(this.getParent(child)).children, child);
            this.getLeafById(child).parent = id;
        }
    }
    removeLeafById(id) {
        this.removeLeafChildrenById(id);
        removeElement(this.leaves[this.leaves[id].parent].children, id);
        delete this.leaves[id];
    }
    removeLeafChildrenRecursively(children) {
        children.forEach((x) => {
            if (this.leaves[x].children.length > 0)
                this.removeLeafChildrenRecursively(this.leaves[x].children);
            delete this.leaves[x];
        });
    }
    removeLeafChildrenById(id) {
        this.removeLeafChildrenRecursively(this.leaves[id].children);
        this.leaves[id].children = [];
    }
    removeLeaf(leaf) {
        this.removeLeafById(leaf.id);
    }
    getLeafById(id) {
        return this.leaves[id];
    }
    getLeaves() {
        return this.leaves;
    }
    getParent(child) {
        return this.leaves[child].parent;
    }
}
exports.Tree = Tree;
function removeElement(array, element) {
    let index = array.indexOf(element);
    if (index > -1) {
        let newArray = array.splice(index, 1).slice();
        if (newArray.length > 1) {
            if ((newArray.length - 1) >= index) {
                return index;
            }
            else {
                return index - 1;
            }
        }
    }
    else {
        return -1;
    }
}
