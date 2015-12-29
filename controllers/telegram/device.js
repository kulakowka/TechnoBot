'use strict'

var storage = require('../../storage')
var browser = require('../../initializers/airplay').browser
var bot = require('../../initializers/telegram')

// device list
bot.onText(/^device list$/, function (msg, match) {
  var fromId = msg.from.id

  let devices = browser.getDevices()

  if (!storage.browserStarted) return bot.sendMessage(fromId, 'Finding airplay device is stopped. Enable detection by using the "browser start". Use the command "help" for additional information.')
  if (!devices.length) return bot.sendMessage(fromId, 'There are no airplay-devices. Try again after a few seconds. Use the command "help" for additional information.')

  let list = devices.map((device, index) => '' + index + ' ' + device.info_.name).join('\n')

  bot.sendMessage(fromId, 'Available devices: \n' + list)
})

// device connect %ID
bot.onText(/^device connect (.+)$/, function (msg, match) {
  var fromId = msg.from.id

  var devices = browser.getDevices()
  var device = getDevice(devices, msg.text)

  if (!storage.browserStarted) return bot.sendMessage(fromId, 'Finding airplay device is stopped. Enable detection by using the "browser start". Use the command "help" for additional information.')
  if (!devices.length) return bot.sendMessage(fromId, 'There are no airplay-devices. Try again after a few seconds. Use the command "help" for additional information.')
  if (!device) return bot.sendMessage(fromId, 'There are no airplay-devices with this number. Use the command "help" for additional information.')

  storage.device = device

  bot.sendMessage(fromId, 'The connection to the device  ' + device.info_.name + ' is completed.')
})

// device status
bot.onText(/^device status$/, function (msg, match) {
  var fromId = msg.from.id
  if (!storage.device) return bot.sendMessage(fromId, 'Current device is not detected. Use the command "help" for additional information.')
  if (!storage.device.ready_) return bot.sendMessage(fromId, 'Current device is not ready. Use the command "help" for additional information.')

  bot.sendMessage(fromId, 'Current device: "' + storage.device.info_.name + '"')
})

// device close
bot.onText(/^device close$/, function (msg, match) {
  var fromId = msg.from.id
  if (!storage.device) return bot.sendMessage(fromId, 'Current device is not detected. Use the command "help" for additional information.')

  storage.device.close()
  storage.device = null

  bot.sendMessage(fromId, 'Connection to the current airplay-device is closed.')
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
