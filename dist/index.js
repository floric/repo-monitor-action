"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const github = require("@actions/github");
async function runAction() {
    try {
        const key = core.getInput("key");
        const value = core.getInput("value");
        const token = core.getInput("token");
        const { owner, repo } = github.context.repo;
        const context = {
            token,
            owner,
            repo,
            path: `data/${key}.json`,
            branch: "gh-pages",
        };
        let res = await getContent(context);
        let existingSha = null;
        let data = null;
        if (!res) {
            core.info(`Called with new key "${key}", will create new file.`);
            data = { key, type: "scalar", values: [] };
        }
        else if ((res === null || res === void 0 ? void 0 : res.status) == 200) {
            core.info(`Extending existing metrics for "${key}"`);
            data = JSON.parse(fromBase64(res.data.content));
            existingSha = res === null || res === void 0 ? void 0 : res.data.sha;
        }
        if (data == null) {
            throw new Error(`Loading or updating data for "${key}" has failed`);
        }
        data.values.push({
            value: Number.parseFloat(value),
            isoDate: new Date().toISOString(),
        });
        const content = toBase64(JSON.stringify(data));
        await createOrUpdateContent(context, content, existingSha);
        core.info("Finished processing new metrics");
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
async function getContent(context) {
    const { token, owner, repo, path, branch } = context;
    const octokit = github.getOctokit(token);
    try {
        return await octokit.repos.getContent({
            owner,
            repo,
            branch,
            path,
        });
    }
    catch (err) {
        return null;
    }
}
async function createOrUpdateContent(context, content, existingSha) {
    const { token, owner, repo, path, branch } = context;
    const octokit = github.getOctokit(token);
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        branch,
        path,
        content,
        sha: existingSha || undefined,
        message: existingSha ? "Updated metrics" : "Created metrics",
    });
}
function fromBase64(content) {
    return Buffer.from(content, "base64").toString("ascii");
}
function toBase64(content) {
    return Buffer.from(content).toString("base64");
}
runAction();
