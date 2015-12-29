# TechnoBot

Slack-bot and Telegram-bot to play music from Soundcloud through Airplay.

## [Slack](https://slack.com/) screenshot:
![Screenshot-slack-bot](https://habrastorage.org/files/24c/b35/412/24cb3541219b4ae79ef2dc1bc79f1705.png)

## [Telegram](https://telegram.org/) screenshot:
![Screenshot-telegram-bot](https://habrastorage.org/files/cf9/7ad/913/cf97ad9135fa43c38e0b1a8818ee92ee.png)

#### Install:

```
git clone https://github.com/kulakowka/TechnoBot.git
cd TechnoBot
npm install 
```

## Run application:

In order to start application in `production` mode, run this command in console.
```
SLACK_API_TOKEN="xoxb-17500190674-HRaNrRXgGSoT0mXIJKm6Ub74" TELEGRAM_TOKEN="190925138:AAF0R2m_ol3T1a45M2s0dniTXmF5EgSzQi7" SOUNDCLOUD_CLIENT_ID="7wr01242daa87493420a97045298b393" NODE_ENV=production node --harmony index.js
```

> ### do not forget to change the keys to the API

## Available commands:

`help` - Show help.

`browser start` - Start the process of finding airplay-devices.

`browser stop` - Stop the process of finding airplay-devices.

`device list` - Show a list of available airplay-devices.

`device connect %ID` - Connect to airplay-device (%ID - number of the device).

`device status` - Show the current status of the airplay-devices.

`device close` - Close connection with the current airplay-device.

`play https://soundcloud...` - Start playing a track from SoundCloud.

`stop`  - Stop playing track.

