const semver = require('semver');
import * as process from 'node:process'
module.exports = semver.satisfies(process.version, '>=15.7.0');
