import * as React from "react";
import * as ReactDOM from "react-dom";
import * as dayjs from "dayjs";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import { generateImage } from "jsdom-screenshot";
import { readFileSync } from "fs";
import { Report } from "../../src/template/Report";
import { ChartGraphics } from "../../src/template/page";

dayjs.extend(localizedFormat);

describe("Report", () => {
  it("Renders correctly", async () => {
    const div = prepareDom();

    const releasesMap = new Map();
    releasesMap.set("rel-a", 1);
    releasesMap.set("rel-b", 2);
    const graphics: ChartGraphics = new Map();
    graphics.set("key-a", {
      config: { description: "Key A" },
      data: {
        key: "key-a",
        type: "scalar",
        values: [
          { releaseId: "rel-b", value: 2, timestamp: 1 },
          { releaseId: "rel-a", value: 1, timestamp: 2 },
          { releaseId: "rel-x", value: -1, timestamp: 3 },
          { releaseId: "rel-y", value: -2, timestamp: 4 },
          { releaseId: "rel-z", value: -3, timestamp: 5 },
        ],
      },
      img: "",
    });
    graphics.set("key-b", {
      config: {},
      data: {
        key: "key-b",
        type: "scalar",
        values: [{ releaseId: "rel-a", value: 1, timestamp: 2 }],
      },
      img: "",
    });
    ReactDOM.render(
      <Report
        date={dayjs(1234567890987).toDate()}
        config={{
          groups: {
            ["General"]: {
              metrics: ["key-a", "key-b"],
              name: "General",
              description: "Desc",
            },
            ["Other"]: {
              metrics: ["key-b"],
              name: "Other",
            },
          },
          metrics: {
            ["key-a"]: { description: "Key A" },
            ["key-b"]: {},
          },
        }}
        context={{
          branch: "master",
          releaseId: "rel-a",
          owner: "floric",
          repo: "repo",
          token: "token",
        }}
        graphics={graphics}
        releases={{
          releases: [
            { id: "rel-a", timestamp: 1 },
            { id: "rel-b", timestamp: 2 },
          ],
          year: 2020,
        }}
        releasesMap={releasesMap}
      />,
      div
    );

    const screenshot = await generateImage({
      viewport: { width: 1024, height: 1024 },
    });
    (expect(screenshot) as any).toMatchImageSnapshot({
      failureThreshold: 0.5,
      failureThresholdType: "percent",
    });
  });
});

function prepareDom() {
  const div = document.createElement("div");
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.innerHTML = readFileSync(
    "node_modules/tailwindcss/dist/tailwind.min.css"
  ).toString();
  head.appendChild(style);
  document.body.appendChild(div);
  return div;
}
