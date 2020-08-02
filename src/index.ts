import * as core from "@actions/core";
import {
  createOrUpdateContent,
  getContent,
  getContext,
  createOrUpdateRelease,
} from "./io/github";
import { MetricsData } from "./model";
import { updateTemplate } from "./template/updater";

async function runAction() {
  try {
    const context = getContext();
    const key = core.getInput("key");
    const value = core.getInput("value");
    if (!key || Number.isNaN(Number.parseFloat(value))) {
      throw new Error("Invalid arguments delivered");
    }
    const path = `data/values/${new Date().getUTCFullYear()}/${key}.json`;

    const { releaseId, releaseYear } = await createOrUpdateRelease(context);

    const { serializedData, existingSha } = await getContent(context, path);
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
    await updateTemplate(context, releaseYear);

    core.info("Finished processing new metrics");
  } catch (error) {
    core.setFailed(error.message);
  }
}

runAction();
