import * as core from "@actions/core";
import * as github from "@actions/github";

type MetricsValue<T> = {
  value: T;
  isoDate: string;
};

type MetricsData = {
  key: string;
  type: "scalar";
  values: Array<MetricsValue<number>>;
};

async function run() {
  try {
    const key = core.getInput("key");
    const value = core.getInput("value");
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;
    const path = `docs/data/${key}.json`;

    let res = await getContent(path, token, owner, repo);
    let data: MetricsData | null = null;
    if (!res) {
      core.info(`Called with new key "${key}", will create new file.`);
      data = { key, type: "scalar", values: [] };
    } else if (res?.status == 200) {
      core.info(`Extending existing metrics for "${key}"`);
      data = JSON.parse(fromBase64(res.data.content));
    }

    if (data == null) {
      throw new Error(`Loading or updating data for "${key}" has failed`);
    }

    data.values.push({
      value: Number.parseFloat(value),
      isoDate: new Date().toISOString(),
    });

    const content = toBase64(JSON.stringify(data));

    const isUpdate = res?.status == 200;
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      content,
      sha: isUpdate ? res?.data.sha : undefined,
      message: isUpdate ? "Updated metrics" : "Created metrics",
    });
    core.info("Finished processing new metrics");
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getContent(
  path: string,
  token: string,
  owner: string,
  repo: string
) {
  const octokit = github.getOctokit(token);
  try {
    return await octokit.repos.getContent({
      owner,
      repo,
      path,
    });
  } catch (err) {
    return null;
  }
}

function fromBase64(content: string) {
  return Buffer.from(content, "base64").toString("ascii");
}

function toBase64(content: string) {
  return Buffer.from(content).toString("base64");
}

run();
