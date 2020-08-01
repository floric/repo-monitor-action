import * as core from "@actions/core";
import { readFileSync } from "fs";
import { getContent, createOrUpdateContent } from "../io/github";
import { MetricsContext } from "../model";

export async function updateTemplate(context: MetricsContext) {
  const { existingSha, serializedData } = await getContent(
    context,
    "index.html"
  );

  const template = readFileSync("src/template/index.html", {
    encoding: "utf8",
    flag: "r",
  });
  if (!template) {
    throw new Error("No template found");
  }
  if (serializedData !== template) {
    await createOrUpdateContent(context, "index.html", template, existingSha);
  } else {
    core.info("Skipped updating template");
  }
}
