const { bot } = require('../../Telegram');
const { getTokenData } = require('../../utils')

const User = require('./user.model');

/**
 * Register User
 */
bot.onText(/\/register/, async (msg) => {

    console.log('**** register called')
    const userDetails = await User.findOne({ chatId: msg.chat.id });
    if (!userDetails) {
        const newUser = new User({
            chatId: msg.chat.id,
            telegramId: msg.from.id,
            username: msg.chat.username,
            firstName: msg.chat.first_name,
            lastName: msg.chat.last_name
        });
        await newUser.save();
        bot.sendMessage(msg.chat.id, "You have been registered!");
    } else {
        bot.sendMessage(msg.chat.id, "You are already registered.");
    }
});

/**
 * Get Token Data
 */
bot.onText(/\/get_token (.+)/, async (msg, match) => {
    const tokenSymbol = match[1].trim(); // Extract token symbol
    const tokenData = await getTokenData(tokenSymbol);

    if (tokenData.status == 200) {
        // Format your response here, adjust based on your token data structure
        const responseMessage = `
            Token: ${tokenData['data']['data'][index]['name']} (${tokenData['data']['data'][index]['symbol']})
            Price: $${tokenData['data']['data'][index]['quote']['USD']['price']}
            Market Cap: $${tokenData['data']['data'][index]['quote']['USD']['market_cap']}
            24-hour trading volume: ${tokenData['data']['data'][index]['quote']['USD']['volume_24h']}
            percent_change_1h: ${tokenData['data']['data'][index]['quote']['USD']['percent_change_1h']}
            percent_change_24h: ${tokenData['data']['data'][index]['quote']['USD']['percent_change_24h']}
            percent_change_7d: ${tokenData['data']['data'][index]['quote']['USD']['percent_change_7d']}
        `;
        bot.sendMessage(msg.chat.id, responseMessage);
    } else {
        bot.sendMessage(msg.chat.id, "Sorry, I couldn't find data for that token.");
    }
});
