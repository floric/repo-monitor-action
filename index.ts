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

    core.info(`Status: ${res.status}`);

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      sha: res.data.sha,
      message: "Updated metrics",
      content: Buffer.from(
        `${res.data.content}\n<!-- Something added !->`
      ).toString("base64"),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
