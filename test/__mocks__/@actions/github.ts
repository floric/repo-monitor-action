import { safeDump } from "js-yaml";
import { toBase64 } from "../../../src/io/encoding";
import { ReleaseYear, MetricsData, Config } from "../../../src/model";

export const getOctokit = () => ({
  repos: {
    createOrUpdateFileContents: async () => {},
    getContent: async (arg) => {
      if (arg.path.endsWith("releases.json")) {
        const year: ReleaseYear = {
          year: 2020,
          releases: [
            { timestamp: 1, id: "rel-a" },
            { timestamp: 2, id: "rel-b" },
          ],
        };
        return createAnswer(JSON.stringify(year));
      } else if (arg.path.endsWith("config.yml")) {
        const config: Config = {
          metrics: {
            ["key-a"]: {
              description:
                "Allow only a smaller spectrum of percentages. For safety reasons.",
              max: 95,
              min: 70,
            },
            ["key-b"]: {},
            ["key-non-relevant"]: {
              description: "Not shown in any group",
            },
          },
          groups: {
            ["general"]: {
              name: "General",
              description: "This group includes all important metrics",
              metrics: ["key-a", "key-x"],
            },
            ["specific"]: {
              name: "General",
              description: "This group has additionally key-b",
              metrics: ["key-a", "key-b"],
            },
          },
        };
        return createAnswer(safeDump(config));
      } else if (arg.path.endsWith("key-a.json")) {
        const data: MetricsData = {
          key: "key-a",
          type: "scalar",
          values: [{ value: 1, releaseId: "rel-a", timestamp: 1 }],
        };
        return createAnswer(JSON.stringify(data));
      } else if (arg.path.endsWith("key-b.json")) {
        const data: MetricsData = {
          key: "key-b",
          type: "scalar",
          values: [
            { value: 1, releaseId: "rel-a", timestamp: 1 },
            { value: -2, releaseId: "rel-b", timestamp: 1 },
          ],
        };
        return createAnswer(JSON.stringify(data));
      } else if (arg.path.endsWith("index.html")) {
        return createAnswer("");
      } else {
        return {
          status: 404,
        };
      }
    },
  },
});

export const context = {
  repo: {
    repo: "repo",
    owner: "owner",
  },
  ref: "master",
};

const createAnswer = (serializedData: string) => ({
  status: 200,
  data: {
    content: toBase64(serializedData),
    sha: "abc",
  },
});
