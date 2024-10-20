require('dotenv').config();
const axios = require('axios');
const { bot } = require('./Telegram');

const Alert = require('./webhook/alert/alert.model');
const Queue = require('./webhook/alert/queue.model');


// Function to get token data
async function getTokenData(tokenSymbol) {
    try {
        response = await axios.get(process['env']['cmc_url'], {
            headers: {
                'X-CMC_PRO_API_KEY': process['env']['cmc_api_key'],
            },
            params: {
                'slug': tokenSymbol,
                'convert': 'USD'
            }
        });
        return response;

    } catch (error) {
        console.error('Error fetching token data:', error);
        return null;
    }
}

// Function to check prices (you can use an interval or a scheduler)
async function checkPriceAlerts() {
    const queue = await Queue.findOne({ isRunning: 'false' })
    if (queue) {
        await Queue.updateOne(
            { isRunning: false }, // Ensure you're checking the boolean value
            { $set: { isRunning: true } } // Set it to false
        );
        console.log('***** queue', 'true')
        const alerts = await Alert.find({ isSent: false }).populate('userId', 'chatId');

        for (const alert of alerts) {
            const currentPrice = await getTokenData(alert['tokenName'].toLowerCase()); // Implement this function to fetch the current price
            if (currentPrice.status == 200) {
                const index = Object.keys(currentPrice['data']['data'])[0]
                if (Number(currentPrice['data']['data'][index]['quote']['USD']['price']) >= Number(alert['priceThreshold'])) {
                    bot.sendMessage(alert['userId']['chatId'], `Alert! ${alert.tokenSymbol} has crossed your threshold of $${alert.priceThreshold}. Current price: $${currentPrice['data']['data'][index]['quote']['USD']['price']}.`);
                    // Optionally remove or update the alert in the database if you want it to trigger only once
                }
            }
        }
        await Queue.updateOne(
            { isRunning: true }, // Ensure you're checking the boolean value
            { $set: { isRunning: false } } // Set it to false
        );
    }
}

/**
 * Check if the Queue exists or update the queue if the server restarts
 */
async function seed() {
    if ((await Queue.find()).length == 0) {
        const queue = new Queue({
            isRunning: 'false',
        });
        await queue.save();
    }
    else {
        console.log('**** updated')
        await Queue.updateOne(
            { isRunning: true }, // Ensure you're checking the boolean value
            { $set: { isRunning: false } } // Set it to false
        );
    }
}

module.exports = {
    getTokenData, checkPriceAlerts, seed
}