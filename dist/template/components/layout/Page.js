"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const React = require("react");
exports.Page = ({ children }) => (React.createElement("div", { className: "bg-gray-100 text-gray-900 flex m-4 justify-center" },
    React.createElement("div", { className: "w-full max-w-6xl" }, children)));
