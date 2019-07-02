'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    
  require('./ab')(app);
  require('./article')(app);
  require('./carousel')(app);
  require('./product')(app);
  require('./rbac')(app);
};
