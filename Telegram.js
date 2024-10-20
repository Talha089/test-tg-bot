require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN; // Your bot token
const bot = new TelegramBot(token, { polling: true });

module.exports = {
    bot
  };
  