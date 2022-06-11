const Twit = require('twit');
const axios = require('axios');
const Bot = new Twit({
    consumer_key: "",
    consumer_secret: "", // you have to fill in all this info to make it work
    access_token: "",
    access_token_secret: ""
});
const Discord = require('discord.js')
const webhookClient = new Discord.WebhookClient({ url: 'YOUR DISCORD WEBHOOK URL ' })

async function uploadQuote() {
    axios.get('https://programming-quotes-api.herokuapp.com/Quotes/random').then(async function (response) {

        const newQuote = '"' + response.data.en + '"' + " - " + response.data.author + "\n\n #programmer #developer #devlife"

        Bot.post('statuses/update', { status: newQuote }, function (err, data, response) {
            console.log("New quote posted!")
            console.log(data)
            const embed = new Discord.MessageEmbed()
                .setTitle('A new quote got posted')
                .addField('Link', `https://twitter.com/i/web/status/${data.id_str}`)
                .addField('Quote', `${data.text}`)
                .setTimestamp()

            webhookClient.send({
                embeds: [embed],
            });
        })

    });
}


var now = new Date();
var delay = 60 * 60 * 1000;
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

setTimeout(function doSomething() {

    uploadQuote()

    setTimeout(doSomething, delay);

}, start);