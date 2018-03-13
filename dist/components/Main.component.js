"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const _1 = require(".");
class Main extends React.Component {
    render() {
        return React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: _1.Home }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: '/tree', component: _1.I3 }));
    }
}
exports.Main = Main;
