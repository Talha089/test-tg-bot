const Alert = require('./alert.model');
const User = require('../user/user.model');

const { bot } = require('../../Telegram');
const { getTokenData } = require('../../utils')


bot.onText(/\/set_alert (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const tokenSymbol = match[1].toLowerCase(); // e.g., "BTC"
    const priceThreshold = parseFloat(match[2]);

    if (isNaN(priceThreshold)) {
        return bot.sendMessage(chatId, "Please provide a valid price threshold.");
    }

    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
        return bot.sendMessage(chatId, "You need to register first using /register.");
    }


    //Check if the cmc has the data of this cryptocurrency

    const tokenData = await getTokenData(tokenSymbol);
    if (tokenData.status != 200) return bot.sendMessage(chatId, `Sorry, We donot have the data of this cryptocurrency`);

    // console.log('***** tokenData', Object.keys(tokenData['data']['data']));
    const index = Object.keys(tokenData['data']['data'])[0]
    console.log('**** index', index);
    //TODO: Check if the current price is already greater than the threshold
    if (await Alert.findOne({ userId: userDetails['_id'], priceThreshold, tokenName: tokenData['data']['data'][index]['name'] })) return bot.sendMessage(chatId, `You've already set this alert`);


    // // Store the alert in the database (you may want to create an Alert model)
    const newAlert = new Alert({
        userId: userDetails['_id'],
        tokenName: tokenData['data']['data'][index]['name'],
        tokenSymbol: tokenData['data']['data'][index]['symbol'],
        priceThreshold: priceThreshold,
        tokenPrice: tokenData['data']['data'][index]['price']
    });

    await newAlert.save();
    bot.sendMessage(chatId, `Price alert set for ${tokenSymbol} at $${priceThreshold}.`);
});


bot.onText(/\/list_alerts/, async (msg) => {
    console.log('**** list_alerts called');
    const userDetails = await User.findOne({ chatId: msg['chat']['id'] })
    if (!userDetails) {
        return bot.sendMessage(chatId, "You need to register first using /register.");
    }

    const userAlerts = await Alert.find({ userId: userDetails['_id'] }).select('tokenName tokenSymbol priceThreshold');


    if (userAlerts.length > 0) {
        const alertsList = userAlerts.map((alert, index) =>
            `${index + 1}. Token: ${alert.tokenName} (${alert.tokenSymbol})\n   Price Threshold: ${alert.priceThreshold}`
        ).join('\n\n');

        bot.sendMessage(msg.chat.id, `Your active alerts:\n${alertsList}`);

    } else {
        bot.sendMessage(msg.chat.id, "You have no active alerts.");
    }
});


bot.onText(/\/remove_alert (\w+)/, async (msg, match) => {
    let alertId = Number(match[1]) - 1; // Extract the alert ID from the command

    console.log('**** remove_alert called with ID:', alertId);

    const userDetails = await User.findOne({ chatId: msg['chat']['id'] })

    if (!userDetails) {
        return bot.sendMessage(chatId, "You need to register first using /register.");
    }
    const userAlerts = await Alert.find({ userId: userDetails['_id'] }).select('tokenName tokenSymbol priceThreshold');

    const deleteAlert = userAlerts[alertId]

    if (!deleteAlert) return bot.sendMessage(msg['chat']['id'], `You donot have any alert with this id : ${alertId + 1}`);
    const deleted = await Alert.deleteOne({ _id: deleteAlert['_id'] })

    const updatedAlerts = await Alert.find({ userId: userDetails['_id'] }).select('tokenName tokenSymbol priceThreshold');

    if (updatedAlerts.length > 0) {
        console.log('***** updatedAlerts', updatedAlerts)

        const sortedAlerts = updatedAlerts.map((alert, index) =>
            `${index + 1}. Token: ${alert.tokenName} (${alert.tokenSymbol})\n   Price Threshold: ${alert.priceThreshold}`
        ).join('\n\n');

        bot.sendMessage(msg.chat.id, `Your active alerts:\n${sortedAlerts}`);


    } else {
        bot.sendMessage(msg.chat.id, "You donot have any alerts");
    }
});