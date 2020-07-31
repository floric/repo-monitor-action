import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    const allRepos = await octokit.repos.listPublic();

    core.info(allRepos.data.map((n) => n.name).reduce((a, b) => `${a}, ${b}`));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
