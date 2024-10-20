'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    isBot: String,
    telegramId: Number,
    chatId: String,
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);