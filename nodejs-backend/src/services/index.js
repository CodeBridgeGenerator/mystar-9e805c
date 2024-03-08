const users = require("./users/users.service.js");
const appraisal = require("./appraisal/appraisal.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(appraisal);
    // ~cb-add-configure-service-name~
};
