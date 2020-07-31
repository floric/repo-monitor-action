const core = require("@actions/core");
const github = require("@actions/github");

try {
  const key = core.getInput("key");
  const key = core.getInput("value");

  console.log(`key= ${key}; value=${value}`);
} catch (error) {
  core.setFailed(error.message);
}
