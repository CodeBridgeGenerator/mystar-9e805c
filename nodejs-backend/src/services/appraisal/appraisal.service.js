const { Appraisal } = require('./appraisal.class');
const createModel = require('../../models/appraisal.model');
const hooks = require('./appraisal.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/appraisal', new Appraisal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('appraisal');

  service.hooks(hooks);
};