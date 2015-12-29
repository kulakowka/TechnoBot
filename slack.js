'use strict'

var assert = require('assert')
var bot = require('./initializers/botkit').bot

// load controllers
require('./controllers/slack/browser')
require('./controllers/slack/core')
require('./controllers/slack/device')
require('./controllers/slack/track')

bot.startRTM(function (err, bot, payload) {
  assert.equal(null, err)
})
