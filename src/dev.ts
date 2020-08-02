import { generatePage } from "./template/page";
import dayjs = require("dayjs");
import { ReleaseYear } from "./model";
import { getRandomInteger } from "./util/math";

const generateRandomReleases = (count: number) => {
  const releases = new Array(count).fill(0).map((_, i) => ({
    id: `r-${count - i}`,
    timestamp: dayjs()
      .subtract(i, "day")
      .subtract(Math.random() * 12, "hour")
      .subtract(Math.random() * 60, "minute")
      .subtract(Math.random() * 60, "second")
      .toDate()
      .getTime(),
  }));

  return { year: 2020, releases };
};

const generateRandomValues = (
  count: number,
  min: number,
  max: number,
  releaseYear: ReleaseYear
) =>
  new Array(count).fill(0).map(() => {
    const release =
      releaseYear.releases[getRandomInteger(releaseYear.releases.length)];
    return {
      releaseId: release.id,
      timestamp: release.timestamp,
      value: (max - min) * Math.random() + min,
    };
  });

export const runDev = async () => {
  const releaseYear = generateRandomReleases(15);
  const source = await generatePage(
    releaseYear,
    [
      {
        key: "percentages",
        type: "scalar",
        values: generateRandomValues(25, 0, 100, releaseYear),
      },
      {
        key: "large-numbers",
        type: "scalar",
        values: generateRandomValues(25, -100000, 100000, releaseYear),
      },
      {
        key: "small-numbers",
        type: "scalar",
        values: generateRandomValues(25, -0.5, 0.5, releaseYear),
      },
    ],
    { owner: "test", repo: "sources" }
  );
  console.log(source);
};

runDev();
