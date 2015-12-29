var TelegramBot = require('node-telegram-bot-api')
var token = require('../config/telegram').token

var bot = new TelegramBot(token, {polling: true})

module.exports = bot
