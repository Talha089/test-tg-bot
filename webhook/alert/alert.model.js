'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let alertSchema = new Schema({
    tokenName: String,
    tokenSymbol: String,
    tokenPrice: String,
    priceThreshold: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    isSent: { type: Boolean, default: 'false' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', alertSchema);