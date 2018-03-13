"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const i3tree_service_1 = require("../services/i3tree.service");
class I3 extends React.Component {
    constructor() {
        super(...arguments);
        this.i3 = new i3tree_service_1.i3Tree();
    }
    createDate() {
        this.i3.newTerminal();
        this.i3.newTerminal();
        this.i3.verticalSplit();
        this.i3.goUp();
        this.i3.newTerminal();
        this.i3.newTerminal();
        this.i3.verticalSplit();
        console.log(this.i3.createTree());
    }
    renderTree() {
        this.createDate();
        return (React.createElement("div", null,
            " Root:",
            this.renderSection(this.i3.getTree().getLeafById("root"))));
    }
    renderSection(leaf) {
        if (leaf.children && leaf.children.length > 0) {
            return React.createElement("div", { key: leaf.id },
                " ",
                leaf.type,
                " ",
                leaf.children.map(x => {
                    let tree = this.i3.getTree().getLeafById(x);
                    if (tree.children && tree.children.length > 0) {
                        return this.renderSection(tree);
                    }
                    else {
                        return React.createElement("div", { key: tree.id }, tree.type);
                    }
                }),
                " ");
        }
        else {
            return "hey";
        }
    }
    render() {
        return React.createElement("div", null, this.renderTree());
    }
}
exports.I3 = I3;
