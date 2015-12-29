'use strict'

var debug = require('debug')('bot:log')
var assert = require('assert')
var bot = require('./initializers/botkit').bot

// load controllers
require('./controllers/browser')
require('./controllers/core')
require('./controllers/device')
require('./controllers/track')

bot.startRTM(function (err, bot, payload) {
  assert.equal(null, err)

  debug('Bot started RTM')
})
