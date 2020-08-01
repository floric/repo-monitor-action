"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = exports.createOrUpdateContent = exports.getContent = void 0;
const core = require("@actions/core");
const github = require("@actions/github");
const encoding_1 = require("./encoding");
async function getContent(context, path) {
    const { token, owner, repo, branch } = context;
    const octokit = github.getOctokit(token);
    try {
        const res = await octokit.repos.getContent({
            owner,
            repo,
            branch,
            path,
        });
        if (!res) {
            return { existingSha: null, serializedData: null };
        }
        else if ((res === null || res === void 0 ? void 0 : res.status) == 200) {
            return {
                serializedData: encoding_1.fromBase64(res.data.content),
                existingSha: res === null || res === void 0 ? void 0 : res.data.sha,
            };
        }
    }
    catch (err) {
        return { existingSha: null, serializedData: null };
    }
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
