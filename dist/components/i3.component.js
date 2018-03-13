"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const i3tree_service_1 = require("../services/i3tree.service");
class I3 extends React.Component {
    constructor(props) {
        super(props);
        this.createDate = () => {
            this.state.i3.newTerminal();
            this.state.i3.newTerminal();
            this.state.i3.verticalSplit();
            this.state.i3.goUp();
            this.state.i3.newTerminal();
            this.state.i3.newTerminal();
            this.state.i3.tabbed();
        };
        this.addTerminal = (e) => {
            this.state.i3.newTerminal();
            this.setState(this.state);
        };
        this.vsplit = (e) => {
            this.state.i3.verticalSplit();
            this.setState(this.state);
        };
        this.state = { i3: new i3tree_service_1.i3Tree() };
    }
    renderTree() {
        return (React.createElement("div", null,
            " Root:",
            this.renderSection(this.state.i3.getTree().getLeafById("root"))));
    }
    renderSection(leaf) {
        if (leaf.children && leaf.children.length > 0) {
            return React.createElement("div", { key: leaf.id },
                " ",
                leaf.type,
                " ",
                leaf.children.map(x => {
                    let tree = this.state.i3.getTree().getLeafById(x);
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
        return (React.createElement("div", null,
            this.renderTree(),
            React.createElement("button", { onClick: this.addTerminal }, "new terminal"),
            React.createElement("button", { onClick: this.vsplit }, "vsplit")));
    }
}
exports.I3 = I3;
