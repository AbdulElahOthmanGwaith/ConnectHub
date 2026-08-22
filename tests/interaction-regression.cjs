const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(
    path.join(__dirname, '..', '3d-interactive-interface.js'),
    'utf8'
);
const start = source.indexOf('rotate: (deltaX, deltaY) => {');
const end = source.indexOf('\n            },', start);
assert.notEqual(start, -1, 'rotate handler is missing');
assert.notEqual(end, -1, 'rotate handler boundary is missing');

const rotateBlock = source.slice(start, end);
assert.match(rotateBlock, /this\.controls\.spherical\.theta/);
assert.match(rotateBlock, /this\.controls\.spherical\.phi/);
assert.match(rotateBlock, /setFromSpherical\(this\.controls\.spherical\)/);
assert.doesNotMatch(rotateBlock, /this\.spherical\b/);

console.log('ConnectHub interaction regression tests passed');
