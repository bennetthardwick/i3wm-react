"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const components_1 = require("./components");
ReactDOM.render(React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement(components_1.App, null)), document.getElementById("root"));
