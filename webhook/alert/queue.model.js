'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let queueSchema = new Schema({
    isRunning: { type: String, default: 'false' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Queue', queueSchema);