'use strict'

var storage = require('../storage')
var browser = require('../initializers/airplay').browser
var controller = require('../initializers/botkit').controller

// device list
controller.hears('^device list$', 'direct_message,direct_mention,mention', function (bot, message) {
  let devices = browser.getDevices()

  if (!storage.browserStarted) return bot.reply(message, 'Обнаружение airplay-устройств выключено. Включите обнаружение с помощью команды `browser start`. Воспользуйтесь командой `help` для получения допольнительной информации.')
  if (!devices.length) return bot.reply(message, 'Нет доступных airplay-устройств. Попробуйте повторить попытку через несколько секунд. Воспользуйтесь командой `help` для получения дополнительной информации.')

  let list = devices.map((device, index) => '`' + index + '` ' + device.info_.name).join('\n')

  bot.reply(message, 'Доступные устройства: \n' + list)
})

// device connect %ID
controller.hears('^device connect', 'direct_message,direct_mention,mention', function (bot, message) {
  var devices = browser.getDevices()
  var device = getDevice(devices, message.text)

  if (!storage.browserStarted) return bot.reply(message, 'Обнаружение airplay-устройств выключено. Включите обнаружение с помощью команды `browser start`. Воспользуйтесь командой `help` для получения допольнительной информации.')
  if (!devices.length) return bot.reply(message, 'Нет доступных airplay-устройств. Попробуйте повторить попытку через несколько секунд. Воспользуйтесь командой `help` для получения дополнительной информации.')
  if (!device) return bot.reply(message, 'Не удалось найти устройство с таким номером. Воспользуйтесь командой `help` для получения дополнительной информации.')

  storage.device = device

  bot.reply(message, 'Соединение с устройством `' + device.info_.name + '` установлено')
})

// device status
controller.hears('^device status$', 'direct_message,direct_mention,mention', function (bot, message) {
  if (!storage.device) return bot.reply(message, 'Текущее устройство не обнаружено. Воспользуйтесь командой `help` для получения дополнительной информации.')
  if (!storage.device.ready_) return bot.reply(message, 'Текущее устройство не готово. Воспользуйтесь командой `help` для получения дополнительной информации.')

  bot.reply(message, 'Текущее устройство: `' + storage.device.info_.name + '`')
})

// device close
controller.hears('^device close$', 'direct_message,direct_mention,mention', function (bot, message) {
  if (!storage.device) return bot.reply(message, 'Текущее устройство не обнаружено. Воспользуйтесь командой `help` для получения дополнительной информации.')

  storage.device.close()
  storage.device = null

  bot.reply(message, 'Соединение с текущим airplay-устройством закрыто')
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
