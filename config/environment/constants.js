'use strict';
module.exports = {
  userRoles: ['user'],
  adminRoles: ['admin'],

};
module.exports.nonce = Math.floor(Math.random(Math.floor(Date.now() / 1000)) * 10000000000);
