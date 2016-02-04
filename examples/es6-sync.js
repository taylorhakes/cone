/*
 Run by:
 babel-node --presets es2015 examples/es6-sync.js
 */

import { test, assert } from '..';

test('simple ES6 sync pass 1', () => {
  assert.equal(1 + 2, 3);
});
test('simple ES6 sync pass 2', () => {
  assert.equal(1 + 4, 5);
});
