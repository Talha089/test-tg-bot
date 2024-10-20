'use strict';
// Development specific configuration
// ==================================
module.exports = {
  serverDomain: 'https://dserver.modernpokerclub.com',

  mongo: {
    db_url: process['env']['db_url'],
    options: {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    },
    debug: false,
  },
  seedDB: true
};