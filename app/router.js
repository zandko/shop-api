'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  
  require('./router/admin/index')(app);
  require('./router/common/index')(app);
  require('./router/home/index')(app);
};
