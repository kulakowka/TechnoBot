'use strict'

var assert = require('assert')
var storage = require('../../storage')
var bot = require('../../initializers/telegram')
var clientId = require('../../config/soundcloud').clientId
var resolve = require('soundcloud-resolve')

let position = 0

// Reset devices
bot.onText(/^play (.+)/, function (msg, match) {
  var fromId = msg.from.id

  if (!storage.device) return bot.sendMessage(fromId, 'Current device is not detected. Use the command "help" for additional information.')
  if (!storage.device.ready_) return bot.sendMessage(fromId, 'Current device is not ready. Use the command "help" for additional information.')

  var track = getSoundcloudUrls(msg.text).filter(isSoundcloudUrl).shift()

  storage.track = track

  resolve(clientId, track, function (err, res, body) {
    assert.equal(null, err)

    storage.device.play(body, position, function (res) {
      if (res) {
        storage.playing = true
        bot.sendMessage(fromId, 'I start playing a track.')
      } else {
        storage.playing = false
        bot.sendMessage(fromId, 'Unable to start playing a track.')
      }
    })
  })
})

// stop
bot.onText(/^play (.+)/, function (msg, match) {
  var fromId = msg.from.id

  storage.playing = false
  storage.device.stop()

  bot.sendMessage(fromId, 'Playing tracks stopped.')
})

function getSoundcloudUrls (text) {
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gmi
  return text.match(urlRegex)
}

function isSoundcloudUrl (url) {
  var regexp = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/gmi
  return regexp.test(url)
}
