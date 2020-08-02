"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Releases = void 0;
const React = require("react");
const dayjs = require("dayjs");
const relativeTimePlugin = require("dayjs/plugin/relativeTime");
const SubHeader_1 = require("./SubHeader");
dayjs.extend(relativeTimePlugin);
const MAX_ITEMS = 20;
exports.Releases = ({ year }) => {
    const newestReleases = year.releases
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, MAX_ITEMS);
    return (React.createElement("div", null,
        React.createElement(SubHeader_1.SubHeader, { header: "Releases" }),
        React.createElement("table", { className: "table-auto w-full text-left" },
            React.createElement("thead", null,
                React.createElement("tr", { className: "bg-gray-800 text-gray-100" },
                    React.createElement("th", { className: "px-4 py-2" }, "#"),
                    React.createElement("th", { className: "px-4 py-2" }, "Date"),
                    React.createElement("th", { className: "px-4 py-2" }, "Commit"))),
            React.createElement("tbody", { id: "tbl-releases-body" }, newestReleases.map((n, i) => (React.createElement("tr", { className: i % 2 == 0 ? "bg-gray-200" : "bg-gray-300" },
                React.createElement("td", { className: "px-4 py-2" }, year.releases.length - i),
                React.createElement("td", { className: "px-4 py-2" }, dayjs(n.timestamp).fromNow()),
                React.createElement("td", { className: "px-4 py-2" }, n.id)))))),
        MAX_ITEMS < year.releases.length ? (React.createElement("p", null,
            "Only last ",
            MAX_ITEMS,
            " items shown.")) : null));
};
