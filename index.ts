import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;
    const path = "docs/index.html";

    let res = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    const decodedContent = fromBase64(res.data.content);
    const content = toBase64(`${decodedContent} <!-- Just a comment -->`);

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      content,
      sha: res.data.sha,
      message: "Updated metrics",
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

function fromBase64(content: string) {
  return Buffer.from(content, "base64").toString("ascii");
}

function toBase64(content: string) {
  return Buffer.from(content).toString("base64");
}
run();
