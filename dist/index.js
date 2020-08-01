"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github_1 = require("./io/github");
const updater_1 = require("./template/updater");
async function runAction() {
    try {
        const context = github_1.getContext();
        const key = core.getInput("key");
        const value = core.getInput("value");
        if (!key || Number.isNaN(Number.parseFloat(value))) {
            throw new Error("Invalid arguments delivered");
        }
        const path = `data/values/${new Date().getUTCFullYear()}/${key}.json`;
        const releaseId = await github_1.createRelease(context);
        const { serializedData, existingSha } = await github_1.getContent(context, path);
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
        await updater_1.updateTemplate(context);
        core.info("Finished processing new metrics");
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
runAction();
