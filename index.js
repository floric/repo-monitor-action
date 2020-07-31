const core = require("@actions/core");
const github = require("@actions/github");

try {
  const key = core.getInput("key");
  const key = core.getInput("value");
  const token = core.getInput("token");
  const octokit = github.getOctokit(token);

  const allRepos = await octokit.repos.listPublic();

  console.log(allRepos.data);
} catch (error) {
  core.setFailed(error.message);
}
