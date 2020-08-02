import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { CanvasRenderService } from "chartjs-node-canvas";
import * as dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import { ReleaseYear, MetricsData } from "../model";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Releases } from "./components/Releases";
import { Values } from "./components/Values";
import { Page } from "./components/layout/Page";

dayjs.extend(localizedFormat);

export const generatePage = async (
  releases: ReleaseYear,
  data: Array<MetricsData>,
  repo: { repo: string; owner: string }
) => {
  const releasesMap = new Map<string, number>();
  releases.releases
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((r, i) => {
      releasesMap.set(r.id, releases.releases.length - i);
    });
  const canvasRenderService = new CanvasRenderService(300, 500);
  const displayedValues = data[0].values.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const img = await canvasRenderService.renderToBuffer({
    type: "line",
    data: {
      labels: displayedValues.map((n) => releasesMap.get(n.releaseId) || "-"),
      datasets: [
        {
          label: data[0].key,
          data: displayedValues.map((n) => n.value),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  return `<!DOCTYPE html>
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
        <Header year={releases} />
        <Releases year={releases} releasesMap={releasesMap} />
        <Values img={img.toString("base64")} />
        <Footer owner={repo.owner} repo={repo.repo} />
      </Page>
    )}
  </body>
</html>`;
};
