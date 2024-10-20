'use strict';

const _ = require('lodash');
const path = require('path');
const express = require('express');
require('dotenv');

const isProduction = false;
process['env']['NODE_ENV'] = process['env']['NODE_ENV'] || 'development';

const all = {
  isProduction,
  env: process['env']['NODE_ENV'],

  // Frontend path to server
  assets: express.static(__dirname + '/../../public'),
  view: path.normalize(__dirname + '/../../public/index.html'),

  // Server port
  port: process.env.PORT || 4000,


  secrets: { session: 'Black0S0fT_s3cr3t_2018' },
  userRoles: ['admin', 'user'],

  mongo: {
    db_url: process['env']['db_url'],
    options: {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    },
    debug: false,
  },

  project_name: 'Telegram Bot for Live Cryptocurrency Data',
};

/* Export the config object based on the NODE_ENV */
/*================================================*/
module.exports = _.merge(all, require(`./${process.env.NODE_ENV}.js`) || {}, require(`./constants.js`));
