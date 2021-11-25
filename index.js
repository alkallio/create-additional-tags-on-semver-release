const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function run() {
  try {
    console.log(process.evn);

    const { GITHUB_SHA, GITHUB_TOKEN } = process.env;

    if (!GITHUB_SHA) {
      core.setFailed('Missing GITHUB_SHA');
      return;
    }

    if (!GITHUB_TOKEN) {
      core.setFailed('Missing GITHUB_TOKEN');
      return;
    }

    const octokit = new GitHub(GITHUB_TOKEN);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
