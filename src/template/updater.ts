import * as core from "@actions/core";
import { getContent, createOrUpdateContent } from "../io/github";
import { MetricsContext, ReleaseYear, MetricsData } from "../model";
import { generatePage } from "./page";

export async function updateTemplate(
  context: MetricsContext,
  releases: ReleaseYear,
  data: Array<MetricsData>
) {
  const { existingSha } = await getContent(context, "index.html");

  const template = await generatePage(releases, data, context);

  core.info(`Generated page successfully`);

  await createOrUpdateContent(context, "index.html", template, existingSha);

  core.info(`Updated page successfully`);
}
