"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelease = exports.getContext = exports.createOrUpdateContent = exports.getContent = void 0;
const core = require("@actions/core");
const github = require("@actions/github");
const encoding_1 = require("./encoding");
async function getContent(context, path) {
    const { token, owner, repo, branch } = context;
    try {
        const octokit = github.getOctokit(token);
        const res = await octokit.repos.getContent({
            owner,
            repo,
            ref: branch,
            branch,
            path,
        });
        if ((res === null || res === void 0 ? void 0 : res.status) == 200) {
            return {
                serializedData: encoding_1.fromBase64(res.data.content),
                existingSha: res.data.sha,
            };
        }
        else {
            core.warning(`Unexpected response code ${res === null || res === void 0 ? void 0 : res.status}`);
        }
    }
    catch (err) {
        core.error(`Reading from ${path} on ${context.branch} failed: ${err.message}`);
    }
    return { existingSha: null, serializedData: null };
}
exports.getContent = getContent;
async function createOrUpdateContent(context, path, content, existingSha) {
    const { token, owner, repo, branch } = context;
    const octokit = github.getOctokit(token);
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        branch,
        path,
        content: encoding_1.toBase64(content),
        sha: existingSha || undefined,
        message: existingSha ? "Updated metrics" : "Created metrics",
    });
}
exports.createOrUpdateContent = createOrUpdateContent;
function getContext() {
    const token = core.getInput("token");
    const { owner, repo } = github.context.repo;
    const { sha: releaseId } = github.context;
    const context = {
        releaseId,
        token,
        owner,
        repo,
        branch: "gh-pages",
    };
    return context;
}
exports.getContext = getContext;
async function createRelease(context) {
    const now = new Date();
    const year = now.getUTCFullYear();
    const release = {
        id: context.releaseId,
        timestamp: now.getTime(),
    };
    const path = `data/releases/${year}/releases.json`;
    const { existingSha, serializedData } = await getContent(context, path);
    let yearReleases;
    if (!serializedData) {
        core.info(`Creating year ${year} for new release`);
        yearReleases = { releases: [], year };
    }
    else {
        yearReleases = JSON.parse(serializedData);
        core.info(`Extending year ${year} with ${yearReleases.releases.length} existing releases`);
    }
    yearReleases.releases.push(release);
    await createOrUpdateContent(context, path, JSON.stringify(yearReleases), existingSha);
    core.info(`Saved release ${release.id}`);
    return release.id;
}
exports.createRelease = createRelease;
