const { bot } = require('./Telegram');
const database = require('./config/connection');
const { checkPriceAlerts, seed } = require('./utils')

database.getConnection();
seed();
require('./webhook/user/index')
require('./webhook/alert/index')

/**
 * Welcome Message
 */

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to the BigOSoft Test# 2!");
});


//Call checkPriceAlerts periodically (e.g., every minute)
setInterval(checkPriceAlerts, 60000);


