# Painless Test Library
[![Build Status](https://travis-ci.org/taylorhakes/painless.svg?branch=master)](https://travis-ci.org/taylorhakes/painless)
[![Coverage Status](https://coveralls.io/repos/github/taylorhakes/painless/badge.svg?branch=master)](https://coveralls.io/github/taylorhakes/painless?branch=master)

Simple test library that is easy to learn, use and debug. Tests can be run with a standard node command `node test.js` allowing you to use all the existing node tools. Tests are really fast. In some cases 10-20x faster than other libraries. Out of the box tests can use ES6/Babel, Promises, Async/Await, Generators, Observables, Callbacks and more.

## Why use painless?
- Easy to learn
- Works with ES6/Babel, Promises, Async/Await, Generators, Callbacks, Observables, Streams,  Processes,  out of the box
- No Globals
- Great diffs on errors (Shows only differences. Very helpful on large objects)
- Really fast (Has the ability to run multiple tests at the same time)
- Easy to debug (Tests are just basic node processes. No subprocesses or threads)
- Batteries included. Comes bundled with assertions and mocking (Chai and Sinon)
- 100% Test Coverage
- Supports coverage support with [nyc](https://github.com/bcoe/nyc)

## Table of Contents
- [Example Tests](#example-tests)
- [How to Use](#how-to-use)
- [FAQs (Comparison to other test libraries)](#faqs)
- [Assertions](#assertions)
- [Mocking/Spy/Stubs](#spyingstubsmocking)
- [Command Line Usage](#command-line-usage)
- [Code Coverage](#code-coverage)

## Example Tests
ES6
```js
import { createGroup, assert } from 'painless';

const test = createGroup();

// Sync test
test('sync test', () => {
    assert.deepEqual({ a: '1' }, { a: '1'});
});

// Promise test. return assert.eventually to wait for Promise
test('promise test', () => {
    return assert.eventually.deepEqual(promiseFn(), { a: '1'});
});
```

[See more examples here](examples)

ES5
```js
var painless = require('painless');
var test = painless.createGroup();
var assert = painless.assert;

// Callback test
test('callback test', function(done) {
    setTimeout(function() {
        assert.deepEqual({ a: '1' }, { a: '1'});
        done();
    }, 10);
});
```

![output](http://i.imgur.com/km7eWcL.png)

## How to use
##### Install
```
npm install painless --save-dev
```
Execute a single test
```
node test/test-file.js
```
Or run multiple tests
```
./node_modules/.bin/painless test/**/*.js
```
Run tests with Babel
```
babel-node ./node_modules/.bin/painless test/**/*.js
```

Add tests to package.json
```js
{
 "scripts": {
    "test": "babel-node painless test/**/*.js"
  }
}
```

### Assertions
Painless uses Chai and Chai-as-promised. Get more info on all available assertions here. [Chai Assertions](http://chaijs.com/api/assert/).
[Chai-as-promised](https://github.com/domenic/chai-as-promised) adds Promise assertions.

Access Chai
```js
// ES6
import { assert } from 'painless';

// ES5
var painless = require('painless');
var assert = painless.assert;
```
It is possible to use any other assertion library as well. You will receive better errors if the library supports [AssertionError](http://wiki.commonjs.org/wiki/Unit_Testing/1.0#Assert)

### Spying/Stubs/Mocking
Painless comes bundled with Sinon to allow all types of mocking. Get more info here. [Sinon Library](http://sinonjs.org/docs/)

Access Spy
```js
// ES6
import { spy } from 'painless';

// ES5
var painless = require('painless');
var spy = painless.spy;
```

Access Stub
```js
// ES6
import { stub } from 'painless';

// ES5
var painless = require('painless');
var stub = painless.stub;
```

Access Mocks
```js
// ES6
import { mock } from 'painless';

// ES5
var painless = require('painless');
var mock = painless.mock;
```

Accessing other Sinon functionality
```js
// ES6
import { sinon } from 'painless';

const xhr = sinon.useFakeXMLHttpRequest();

// ES5
var painless = require('painless');
var sinon = painless.sinon;

var xhr = sinon.useFakeXMLHttpRequest();
```

### Command Line Usage
```
./node_modules/.bin/painless test/**/*.js
```
With Babel
```
babel-node ./node_modules/.bin/painless test/**/*.js
```
- `--async,-a` Run tests async. This will speed up tests that use IO or network. It is not recommended while debugging. It will make tests tough to reason about.
- `--bunch,-b` Bunch size. If using the async flag, it determines the number of tests to run at the same time. By default this is 10.
- `--reporter,-r` Specify a different reporter. By default painlesss use dot. Options are dot, spec and tap.
- `--include, -i` Specify other files to include. NPM modules or local code. Useful for adding polyfills or other global code.

View docs for [creating custom reporters](DOCUMENTATION.md)

### Async
Painless has the ability to run tests async. This will execute tests at the same time, but in a single process and thread. It uses node's standard event system to execute other tests while a test is doing IO or network tasks. This can significantly speed up your tests if you are doing IO or network tests. If your tests are CPU bound, you will not see any gains because everything is running in the same thread.
Enable async using the command options below. While debugging your tests, it is not recommended to use async because it will make execution flow harder to understand.

### Code Coverage
Code coverage is really easy to use. Just install [nyc](https://github.com/bcoe/nyc)
```
npm install nyc --save-dev
```
#### Coverage in your console
```
nyc --cache --reporter=text ./node_modules/bin/painless test/**/*.js
```
#### Coverage in HTML report
```
nyc --cache --reporter=html ./node_modules/bin/painless test/**/*.js
```
#### Send coverage to `coveralls`
```
npm install coveralls
```
then (make sure COVERALLS_REPO_TOKEN is in your environment variables)
```
nyc --reporter=text-lcov ./node_modules/bin/painless test/**/*.js  | ./node_modules/.bin/coveralls
```

### Browser Support
Tests can run in browser with [karma-painless](https://github.com/taylorhakes/karma-painless)

## FAQS
1. Why should I use painless over other test libraries?

Go [here](#comparison) for comparisons to other test libraries. Painless is not groundbreaking in any way. If you like it, use it. It is more important to test your javascript code. The test framework is a minor detail.

2. Why bundle other libraries (Chai, Sinon, etc)? Why not let the user decide?

Painless tries to achieve a test library that just works. The goal is to be able to start writing tests as soon as possible. It is possible to switch out assertion and mocking libraries, but defaults are available.


## Compared to other libraries <a name="comparison"></a>
#### Mocha
Painless Advantages
- Has everything you need included (assertions, mocking, etc)
- Supports Generators, Observables, Streams, Processes out of the box
- Doesn't need a separate executable to run (just run `node test.js`)
- Is easier to debug (single process, better error messages, easy to read diffs)
- Has no globals
- Run tests at the same time (speed improvements)

Mocha Advantages
- More widely used (more battle tested)

#### AVA
Painless Advantages
- Supports Browser and Node
- Better error messages (beautiful diff when tests fail)
- Easier to debug (single process and thread)
- Has everything you need included (assertions, mocking, etc)
- Doesn't need a separate executable to run (just run `node test.js`)
- Faster for most types of tests (even IO tests with painless --async flag)
- Doesn't require babel (write your tests in ES5, typescript, coffeescript, etc)
- Built-in support for Node streams and processes

AVA Advantages
- Test files are isolated (provides some isolation)

#### Jasmine
Painless Advantages
- Supports Promises, Async/Await, Generators, Observables, Streams, Processes out of the box
- Doesn't need a separate executable to run (just run `node test.js`)
- Easier to debug (single process, better error messages, easy to read diffs)
- Has no globals
- Run tests at the same time (speed improvements)

Jasmine Advantages
- More widely used (more battle tested)

#### Tape
Painless Advantages
- Exceptions are caught in each test and reported. Your tests don't stop at the first failure.
- Supports Promises, Async/Await, Generators, Observables, Streams, Processes
- Has everything you need included (assertions, mocking, etc)
- Simpler test syntax (No need to call `t.end()`. Your tests end based on the return)
- Better output format out of the box (Easier to read than TAP. painless supports TAP too)
- Supports test groups (`beforeEach` and `afterEach`)
- Better error messages
- Run tests at the same time (speed improvements)
