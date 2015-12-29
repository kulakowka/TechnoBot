'use strict'

var debug = require('debug')('bot:core')

var controller = require('../initializers/botkit').controller

// help
controller.hears('^help$', 'direct_message,direct_mention,mention', function (bot, message) {
  debug('controller.hears: help')

  let text = ('\n\nПривет! \n' +
              'Меня зовут Технобот, я умею проигрывать музыку из soundcloud сразу на airplay-устройство.\n' +

              '\n' +
              'Доступные команды:' +
              '\n' +
              '`browser start` - Запустить процесс обнаружения airplay-устройств.\n' +
              '`browser stop` - Остановить процесс обнаружения airplay-устройств.\n' +

              '\n' +
              '`device list` - Показать список доступных airplay-устройств.\n' +
              '`device connect %ID` - Установить соединение с airplay-устройством (%ID - номер устройства).\n' +
              '`device status` - Показать статус текущего airplay-устройства.\n' +
              '`device close` - Завершить соединение с текущим airplay-устройством.\n' +

              '\n' +
              '`play https://soundcloud...` - Начать проигрывание трека из SoundCloud.\n' +
              '`stop`  - Остановать проигрывание трека.\n')

  bot.reply(message, text)
})
