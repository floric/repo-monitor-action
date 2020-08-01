import * as core from "@actions/core";
import * as github from "@actions/github";
import { MetricsContext } from "../model";
import { fromBase64, toBase64 } from "./encoding";

export async function getContent(
  context: MetricsContext,
  path: string
): Promise<{ serializedData: string | null; existingSha: string | null }> {
  const { token, owner, repo, branch } = context;
  try {
    const octokit = github.getOctokit(token);
    const res = await octokit.repos.getContent({
      owner,
      repo,
      branch,
      path,
    });
    if (res?.status == 200) {
      core.info("Found existing file");
      return {
        serializedData: fromBase64(res.data.content),
        existingSha: res.data.sha,
      };
    } else {
      core.warning(`Unexpected response code ${res?.status}`);
    }
  } catch (err) {
    core.error(
      `Reading from ${path} on ${context.branch} failed: ${err.message}`
    );
  }
  return { existingSha: null, serializedData: null };
}

export async function createOrUpdateContent(
  context: MetricsContext,
  path: string,
  content: string,
  existingSha: string | null
) {
  const { token, owner, repo, branch } = context;
  const octokit = github.getOctokit(token);
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    branch,
    path,
    content: toBase64(content),
    sha: existingSha || undefined,
    message: existingSha ? "Updated metrics" : "Created metrics",
  });
}

export function getContext() {
  const token = core.getInput("token");
  const { owner, repo } = github.context.repo;
  const { sha: releaseId } = github.context;
  const context: MetricsContext = {
    releaseId,
    token,
    owner,
    repo,
    branch: "gh-pages",
  };
  return context;
}
