import * as core from "@actions/core";
import { createOrUpdateContent, getContent, getContext } from "./io/github";
import { MetricsData, Release, MetricsContext, ReleaseYear } from "./model";

async function runAction() {
  try {
    const context = getContext();
    const key = core.getInput("key");
    const value = core.getInput("value");
    const path = `data/${new Date().getUTCFullYear()}/${key}.json`;

    const releaseId = await createRelease(context);

    let { serializedData, existingSha } = await getContent(context, path);
    let data: MetricsData;
    if (!serializedData) {
      core.info(`Called with new key "${key}", will create new file.`);
      data = { key, type: "scalar", values: [] };
    } else {
      core.info(`Extending existing metrics for "${key}"`);
      data = JSON.parse(serializedData);
    }

    data.values.push({
      value: Number.parseFloat(value),
      timestamp: new Date().getTime(),
      releaseId,
    });

    const content = JSON.stringify(data);
    await createOrUpdateContent(context, path, content, existingSha);

    core.info("Finished processing new metrics");
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function createRelease(context: MetricsContext) {
  const now = new Date();
  const release: Release = {
    id: context.releaseId,
    timestamp: now.getTime(),
  };
  const path = `data/releases/${now.getUTCFullYear()}/releases.json`;
  let { existingSha, serializedData } = await getContent(context, path);
  let year: ReleaseYear;
  if (serializedData) {
    year = JSON.parse(serializedData);
    core.info(
      `Extending year ${year.year} with ${year.releases.length} existing releases`
    );
  } else {
    core.info(`Creating new year ${now.getUTCFullYear()} for new release`);
    year = { releases: [], year: now.getUTCFullYear() };
  }
  year.releases.push(release);

  await createOrUpdateContent(context, path, JSON.stringify(year), existingSha);

  core.info(`Saved release ${release.id}`);

  return release.id;
}

runAction();
