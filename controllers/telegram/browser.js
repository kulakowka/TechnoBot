'use strict'

var browserStorage = require('../../storage/index')
var browser = require('../../initializers/airplay').browser
var bot = require('../../initializers/telegram')

// browser start
bot.onText(/^browser start$/, function (msg, match) {
  var fromId = msg.from.id

  browserStorage.browserStarted = true
  browser.start()

  bot.sendMessage(fromId, 'Device discovery process is started.')
})

// browser stop
bot.onText(/^browser stop$/, function (msg, match) {
  var fromId = msg.from.id

  browserStorage.browserStarted = false
  browser.stop()

  bot.sendMessage(fromId, 'Device discovery process is stopped.')
})
