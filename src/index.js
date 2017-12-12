import {mockContext, renderContext} from './mock-context.js';
import simulate from './simulate';
import assert from 'assert';

export function request(app, url, options = {}) {
  if (__BROWSER__) {
    throw new Error(
      '[fusion-test-utils] Request api not support from the browser. Please use `render` instead'
    );
  }
  const ctx = mockContext(url, options);
  return simulate(app, ctx);
}

export function render(app, url, options = {}) {
  const ctx = renderContext(url, options);
  return simulate(app, ctx);
}

let test;
if (typeof global.jest !== 'undefined') {
  /* eslint-env node */
  test = (description, callback, ...rest) =>
    global.it(description, () => callback(assert), ...rest);
} else {
  const notSupported = () => {
    throw new Error('Can’t import test() when not using the test-app target.');
  };
  test = notSupported;
}
export {test};
