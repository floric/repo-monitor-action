import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import {
  ReleaseYear,
  MetricsData,
  Config,
  MetricsContext,
  MetricConfig,
} from "../model";
import { importConfig } from "./config/importer";
import { getContent } from "../io/github";
import { Report } from "./Report";

dayjs.extend(localizedFormat);

export type ChartGraphics = Map<
  string,
  { config: MetricConfig; data: MetricsData }
>;

export const generatePage = async (
  releases: ReleaseYear,
  context: MetricsContext
) => {
  const releasesMap = new Map<string, number>();
  releases.releases
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach((r, i) => releasesMap.set(r.id, releases.releases.length - i));
  const config = await importConfig(context);
  const data = await getAllData(config, context);
  const graphics = await generateGraphics(data, config);
  const props = {
    releases,
    releasesMap,
    config,
    graphics,
    context,
    date: new Date(),
  };
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${context.owner}/${context.repo} | Metrics</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/tailwindcss@1.6.0/dist/tailwind.min.css"
      integrity="sha256-Y4vGjLmrpriLD3X1h1YdyzE2icdiBsJHBXORYXlyDwM="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.14.0/css/all.css"
      integrity="sha256-HmKKK3VimMDCOGPTx1mp/5Iaip6BWMZy5HMhLc+4o9E="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/react-vis@1.11.7/dist/style.css"
      integrity="sha256-uTTyxESm1mbElCHBVDnB3kYjSQ/WWdhItODj347ICOY="
      crossorigin="anonymous"
    />
  </head>
  <body>
    ${ReactDOM.renderToStaticMarkup(<Report {...props} />)}
  </body>
</html>`;
};

export const generateGraphics = async (
  data: Array<MetricsData>,
  config: Config
): Promise<ChartGraphics> => {
  const allMetrics = await Promise.all(
    data.map(async (data) => {
      const configForKey = config.metrics[data.key];
      return {
        data,
        config: configForKey,
      };
    })
  );

  const resultMap = new Map();
  allMetrics.forEach((m) => {
    resultMap.set(m.data.key, m);
  });
  return resultMap;
};

const getAllData = async (config: Config, context: MetricsContext) => {
  const keysToFetch = new Set(
    Object.values(config.groups)
      .map((g) => g.metrics)
      .reduce((a, b) => [...a, ...b], [])
  );
  const rawData = await Promise.all(
    Array.from(keysToFetch).map((key) =>
      getContent(
        context,
        `data/values/${new Date().getUTCFullYear()}/${key}.json`
      )
    )
  );
  const data = rawData
    .filter((n) => !!n.existingSha)
    .map((n) => JSON.parse(n.serializedData));
  return data;
};
