import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { ReleaseYear } from "../model";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Releases } from "./components/Releases";
import { Values } from "./components/Values";
import { Page } from "./components/layout/Page";

export const generatePage = (
  releases: ReleaseYear,
  repo: { repo: string; owner: string }
) => `<!DOCTYPE html>
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
      src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
      integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI="
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    ${ReactDOM.renderToStaticMarkup(
      <Page>
        <Header />
        <Releases year={releases} />
        <Values />
        <Footer owner={repo.owner} repo={repo.repo} />
      </Page>
    )}
  </body>
</html>`;
