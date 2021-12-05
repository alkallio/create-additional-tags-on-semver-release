const tagOperations = require('./tagOperations');

test('Check if pre-release', async () => {
  let preReleaseTag = 'v1.2.3-asdf';
  expect(tagOperations.isPrerelease(preReleaseTag)).toBeTruthy();

  let releaseTag = 'v1.2.3';
  expect(tagOperations.isPrerelease(releaseTag)).toBeFalsy();
});

test('Get Major and Minor', async () => {
  let tag = 'v1.2.3-asdf';
  expect(tagOperations.getMinor(tag)).toBe(2);
  expect(tagOperations.getMajor(tag)).toBe(1);
});
