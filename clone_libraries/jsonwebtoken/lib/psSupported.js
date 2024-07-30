var semver = require('semver');
import * as process from 'node:process'
module.exports = semver.satisfies(process.version, '^6.12.0 || >=8.0.0');
