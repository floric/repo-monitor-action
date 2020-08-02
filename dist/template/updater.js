"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplate = void 0;
const core = require("@actions/core");
const github_1 = require("../io/github");
const page_1 = require("./page");
async function updateTemplate(context) {
    const { existingSha } = await github_1.getContent(context, "index.html");
    const template = page_1.generatePage();
    core.info(`Generated page successfully`);
    await github_1.createOrUpdateContent(context, "index.html", template, existingSha);
    core.info(`Updated page successfully`);
}
exports.updateTemplate = updateTemplate;
