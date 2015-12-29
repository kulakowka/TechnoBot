'use strict'

var Botkit = require('botkit')
var config = require('../config/slack')
var controller = Botkit.slackbot()

var bot = controller.spawn({
  token: config.apiToken
})

module.exports.controller = controller
module.exports.bot = bot
