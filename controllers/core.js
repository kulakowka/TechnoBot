'use strict'

var debug = require('debug')('bot:core')

var controller = require('../initializers/botkit').controller

// help
controller.hears('^help$', 'direct_message,direct_mention,mention', function (bot, message) {
  debug('controller.hears: help')

  let text = ('\n\nHello! \n' +
              'My name TechnoBot, I am able to play music from soundcloud directly on airplay-device.\n' +

              '\n' +
              'Available commands:' +
              '\n' +
              '`browser start` - Start the process of finding airplay-devices.\n' +
              '`browser stop` - Stop the process of finding airplay-devices.\n' +

              '\n' +
              '`device list` - Show a list of available airplay-devices.\n' +
              '`device connect %ID` - Connect to airplay-device (%ID - number of the device).\n' +
              '`device status` - Show the current status of the airplay-devices.\n' +
              '`device close` - Close connection with the current airplay-device.\n' +

              '\n' +
              '`play https://soundcloud...` - Start playing a track from SoundCloud.\n' +
              '`stop`  - Stop playing track.\n')

  bot.reply(message, text)
})
