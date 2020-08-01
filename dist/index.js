"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github_1 = require("./io/github");
async function runAction() {
    try {
        const context = github_1.getContext();
        const key = core.getInput("key");
        const value = core.getInput("value");
        const path = `data/values/${new Date().getUTCFullYear()}/${key}.json`;
        const releaseId = await createRelease(context);
        let { serializedData, existingSha } = await github_1.getContent(context, path);
        let data;
        if (!serializedData) {
            core.info(`Called with new key "${key}", will create new file.`);
            data = { key, type: "scalar", values: [] };
        }
        else {
            core.info(`Extending existing metrics for "${key}"`);
            data = JSON.parse(serializedData);
        }
        data.values.push({
            value: Number.parseFloat(value),
            timestamp: new Date().getTime(),
            releaseId,
        });
        const content = JSON.stringify(data);
        await github_1.createOrUpdateContent(context, path, content, existingSha);
        core.info("Finished processing new metrics");
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
async function createRelease(context) {
    const now = new Date();
    const release = {
        id: context.releaseId,
        timestamp: now.getTime(),
    };
    const path = `data/releases/${now.getUTCFullYear()}/releases.json`;
    let { existingSha, serializedData } = await github_1.getContent(context, path);
    let year;
    if (serializedData) {
        year = JSON.parse(serializedData);
        core.info(`Extending year ${year.year} with ${year.releases.length} existing releases`);
    }
    else {
        core.info(`Creating year ${now.getUTCFullYear()} for new release`);
        year = { releases: [], year: now.getUTCFullYear() };
    }
    year.releases.push(release);
    await github_1.createOrUpdateContent(context, path, JSON.stringify(year), existingSha);
    core.info(`Saved release ${release.id}`);
    return release.id;
}
runAction();
