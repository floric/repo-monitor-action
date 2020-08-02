import { generatePage } from "./template/page";

export const runDev = async () => {
  const source = await generatePage(
    {
      year: 1993,
      releases: [
        { id: "abc", timestamp: 3000 },
        { id: "xyz", timestamp: 1000 },
      ],
    },
    [
      {
        key: "key-a",
        type: "scalar",
        values: [
          { releaseId: "xyz", timestamp: 1000, value: 987 },
          { releaseId: "unknown", timestamp: 2000, value: 456 },
          { releaseId: "abc", timestamp: 3000, value: 123 },
        ],
      },
    ],
    { owner: "test", repo: "sources" }
  );
  console.log(source);
};

runDev();
