import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { CanvasRenderService } from "chartjs-node-canvas";
import * as dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import { ReleaseYear, MetricsData } from "../model";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Releases } from "./components/Releases";
import { Metrics } from "./components/Metrics";
import { Page } from "./components/layout/Page";
import { generateLineChart } from "./visualizations/line";

dayjs.extend(localizedFormat);

export const generatePage = async (
  releases: ReleaseYear,
  data: Array<MetricsData>,
  repo: { repo: string; owner: string }
) => {
  const releasesMap = new Map<string, number>();
  releases.releases
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((r, i) => releasesMap.set(r.id, releases.releases.length - i));
  const graphics = await generateGraphics(data, releasesMap);
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
  </head>
  <body>
    ${ReactDOM.renderToStaticMarkup(
      <Page>
        <Header year={releases} />
        <Releases year={releases} releasesMap={releasesMap} />
        <Metrics graphics={graphics} />
        <Footer {...repo} />
      </Page>
    )}
  </body>
</html>`;
};

const generateGraphics = (
  data: Array<MetricsData>,
  releasesMap: Map<string, number>
) =>
  Promise.all(
    data.map(async (d) => ({ data: d, img: await renderImage(d, releasesMap) }))
  );

const renderImage = async (
  data: MetricsData,
  releasesMap: Map<string, number>
) => {
  const canvasRenderService = new CanvasRenderService(500, 500);
  const buffer = await canvasRenderService.renderToBuffer(
    generateLineChart(data, releasesMap)
  );
  return buffer.toString("base64");
};
