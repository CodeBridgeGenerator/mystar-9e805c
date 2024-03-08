const assert = require('assert');
const app = require('../../src/app');

describe('\'appraisal\' service', () => {
  it('registered the service', () => {
    const service = app.service('appraisal');

    assert.ok(service, 'Registered the service (appraisal)');
  });
});
