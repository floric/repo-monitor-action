import * as core from "@actions/core";
import { getContent, createOrUpdateContent } from "../io/github";
import { MetricsContext } from "../model";
import { generatePage } from "./page";

export async function updateTemplate(context: MetricsContext) {
  const { existingSha } = await getContent(context, "index.html");

  const template = generatePage();
  if (!template) {
    throw new Error("No template found");
  }

  await createOrUpdateContent(context, "index.html", template, existingSha);

  core.info(`Updated template successfully`);
}
