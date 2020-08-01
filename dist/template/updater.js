"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplate = void 0;
const core = require("@actions/core");
const fs_1 = require("fs");
const github_1 = require("../io/github");
async function updateTemplate(context) {
    const { existingSha, serializedData } = await github_1.getContent(context, "index.html");
    const template = fs_1.readFileSync("src/template/index.html", {
        encoding: "utf8",
        flag: "r",
    });
    if (serializedData !== template) {
        await github_1.createOrUpdateContent(context, "index.html", template, existingSha);
    }
    else {
        core.info("Skipped updating template");
    }
}
exports.updateTemplate = updateTemplate;
