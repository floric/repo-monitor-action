"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePage = void 0;
const React = require("react");
const ReactDOM = require("react-dom/server");
const Footer_1 = require("./components/Footer");
const Header_1 = require("./components/Header");
const Releases_1 = require("./components/Releases");
const Values_1 = require("./components/Values");
const Page_1 = require("./components/layout/Page");
exports.generatePage = (releases, repo) => `<!DOCTYPE html>
<html>
  <head>
    <title>Metrics</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/tailwindcss@1.6.0/dist/tailwind.min.css"
      integrity="sha256-Y4vGjLmrpriLD3X1h1YdyzE2icdiBsJHBXORYXlyDwM="
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/dayjs@1.8.31/dayjs.min.js"
      integrity="sha256-ORgF0pKrTKxau29bikHxGniNlpQtd9Ku1vbl5/m+mJE="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/dayjs@1.8.31/plugin/relativeTime.js"
      integrity="sha256-tMJ/JI74gvcd/JCL4zekEwHfyHfT2XKUd5GAZn6fJOU="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
      integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI="
      crossorigin="anonymous"
    ></script>
    <script>
      dayjs.extend(window.dayjs_plugin_relativeTime);
    </script>
  </head>
  <body>
    ${ReactDOM.renderToStaticMarkup(React.createElement(Page_1.Page, null,
    React.createElement(Header_1.Header, null),
    React.createElement(Releases_1.Releases, { year: releases }),
    React.createElement(Values_1.Values, null),
    React.createElement(Footer_1.Footer, { owner: repo.owner, repo: repo.repo })))}
  </body>
</html>`;
