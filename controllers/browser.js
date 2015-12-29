'use strict'

var browserStorage = require('../storage/index')
var browser = require('../initializers/airplay').browser
var controller = require('../initializers/botkit').controller

// browser start
controller.hears('^browser start$', 'direct_message,direct_mention,mention', function (bot, message) {
  browserStorage.browserStarted = true
  browser.start()
  bot.reply(message, 'Device discovery process is started.')
})

// browser stop
controller.hears('^browser stop$', 'direct_message,direct_mention,mention', function (bot, message) {
  browserStorage.browserStarted = false
  browser.stop()
  bot.reply(message, 'Device discovery process is stopped.')
})
