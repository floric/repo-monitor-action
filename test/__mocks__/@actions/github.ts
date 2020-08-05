import { toBase64 } from "../../../src/io/encoding";
import { ReleaseYear, MetricsData } from "../../../src/model";

export const getOctokit = () => ({
  repos: {
    createOrUpdateFileContents: async () => {},
    getContent: async (arg) => {
      if (arg.path.endsWith("releases.json")) {
        const year: ReleaseYear = {
          year: 2020,
          releases: [{ timestamp: 1, id: "rel-a" }],
        };
        return {
          status: 200,
          data: {
            content: toBase64(JSON.stringify(year)),
          },
        };
      }
      const data: MetricsData = {
        key: "key-a",
        type: "scalar",
        values: [{ value: 1, releaseId: "rel-a", timestamp: 1 }],
      };
      return {
        status: 200,
        data: {
          content: toBase64(JSON.stringify(data)),
        },
      };
    },
  },
});

export const context = {
  repo: {
    repo: "repo",
    owner: "owner",
  },
};
