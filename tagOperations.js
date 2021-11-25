const semver = require('semver');

let isValid = function (tagName) {
    if (semver.valid(tagName) === null) {
        return false;
    }
    return true;
};

let isPrerelease = function (tagName) {
    if (semver.prerelease(tagName) === null ) {
        return false;
    }
    return true;
};

let getMinor = function (tagName) {
    return semver.minor(tagName);
}

let getMajor = function (tagName) {
    return semver.major(tagName);
}

module.exports = {
    isValid,
    isPrerelease,
    getMinor,
    getMajor,
}
