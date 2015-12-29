'use strict'

var storage = require('../storage')
var browser = require('../initializers/airplay').browser
var controller = require('../initializers/botkit').controller

// device list
controller.hears('^device list$', 'direct_message,direct_mention,mention', function (bot, message) {
  let devices = browser.getDevices()

  if (!storage.browserStarted) return bot.reply(message, 'Finding airplay device is stopped. Enable detection by using the `browser start`. Use the command `help` for additional information.')
  if (!devices.length) return bot.reply(message, 'There are no airplay-devices. Try again after a few seconds. Use the command `help` for additional information.')

  let list = devices.map((device, index) => '`' + index + '` ' + device.info_.name).join('\n')

  bot.reply(message, 'Available devices: \n' + list)
})

// device connect %ID
controller.hears('^device connect', 'direct_message,direct_mention,mention', function (bot, message) {
  var devices = browser.getDevices()
  var device = getDevice(devices, message.text)

  if (!storage.browserStarted) return bot.reply(message, 'Finding airplay device is stopped. Enable detection by using the `browser start`. Use the command `help` for additional information.')
  if (!devices.length) return bot.reply(message, 'There are no airplay-devices. Try again after a few seconds. Use the command `help` for additional information.')
  if (!device) return bot.reply(message, 'There are no airplay-devices with this number. Use the command `help` for additional information.')

  storage.device = device

  bot.reply(message, 'The connection to the device  `' + device.info_.name + '` is completed.')
})

// device status
controller.hears('^device status$', 'direct_message,direct_mention,mention', function (bot, message) {
  if (!storage.device) return bot.reply(message, 'Current device is not detected. Use the command `help` for additional information.')
  if (!storage.device.ready_) return bot.reply(message, 'Current device is not ready. Use the command `help` for additional information.')

  bot.reply(message, 'Current device: `' + storage.device.info_.name + '`')
})

// device close
controller.hears('^device close$', 'direct_message,direct_mention,mention', function (bot, message) {
  if (!storage.device) return bot.reply(message, 'Current device is not detected. Use the command `help` for additional information.')

  storage.device.close()
  storage.device = null

  bot.reply(message, 'Connection to the current airplay-device is closed.')
})

function getDeviceId (text) {
  var regex = /^device connect (\d+)/
  var result = text.match(regex)
  return result && parseInt(result[1], 10)
}

function getDevice (devices, text) {
  let deviceId = getDeviceId(text)
  let device = devices.filter(device => deviceId === device.id || deviceId === device.info_.name)
  return device[0]
}
