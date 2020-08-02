"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const React = require("react");
exports.Footer = ({ owner, repo, }) => (React.createElement("div", null,
    React.createElement("p", { className: "text-center" },
        "Generated $",
        new Date().toLocaleString(),
        " for $",
        owner,
        "/$",
        repo)));
