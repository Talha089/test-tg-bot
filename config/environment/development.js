'use strict';
// Development specific configuration
// ==================================
module.exports = {
  serverDomain: 'https://eel-firm-buffalo.ngrok-free.a',

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