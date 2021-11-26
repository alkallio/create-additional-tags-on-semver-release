const core = require('@actions/core');
const github = require('@actions/github');
const tagOperations = require('./tagOperations');

async function run() {
  try {

    const token = core.getInput('github_token');
    const context = github.context;
    const github_sha = context.sha;
    const octokit = github.getOctokit(token);

    core.info(`Event is ${context.eventName}`);

    // https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#webhook-payload-object-38
    if (context.eventName !== 'release' && context.action !== 'released') {
      core.setFailed(`This action only supports on 'release' event, action 'released'  for now`);
      return;
    }

    let tag = process.env.GITHUB_REF_NAME;

    let majorTag = 'v' + tagOperations.getMajor(tag);
    let minorTag = majorTag + '.' + tagOperations.getMinor(tag);

    core.notice(`Major tag: ${majorTag}`);
    createOrUpdate(majorTag, github_sha, octokit, context);
  
    core.notice(`Minor tag: ${minorTag}`);
    createOrUpdate(minorTag, github_sha, octokit, context);

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function createOrUpdate(tagName, github_sha, octokit, context) {
  let ref;

  try {
    ref = await octokit.rest.git.getRef({
      ...context.repo,
      ref: `tags/${tagName}`
    });
  } catch (e) {
    if (e.status === 404) {
      // Ignore tag not existing
    } else {
      throw e;
    }
  }

  if (!ref) {
    await octokit.rest.git.createRef({
      ...context.repo,
      ref: `refs/tags/${tagName}`,
      sha: github_sha
    });
  } else {
    await octokit.rest.git.updateRef({
      ...context.repo,
      ref: `tags/${tagName}`,
      sha: github_sha
    });
  }
}

run();
