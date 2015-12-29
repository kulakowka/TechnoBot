# TechnoBot

Slack-bot to play music from Soundcloud through Airplay.

![Screenshot](https://habrastorage.org/files/8e3/df9/638/8e3df96382cd448c82fd8fc77f94fa71.png)


#### Install:

```
git clone https://github.com/kulakowka/TechnoBot.git
cd TechnoBot
npm install 
```

## Run application:

In order to start application in `production` mode, run this command in console.
```
SLACK_API_TOKEN="xoxb-17500190674-TRa8hRX7CSoT6mXIJKm5Ub74" SOUNDCLOUD_CLIENT_ID="77504242da580453450a59055278b383" NODE_ENV=production node --harmony index.js
```

> ### do not forget to change the keys to the API

Now, open in your browser [http://localhost:3000](http://localhost:3000)

## Available commands:

`browser start` - Start the process of finding airplay-devices.

`browser stop` - Stop the process of finding airplay-devices.

`device list` - Show a list of available airplay-devices.

`device connect %ID` - Connect to airplay-device (%ID - number of the device).

`device status` - Show the current status of the airplay-devices.

`device close` - Close connection with the current airplay-device.

`play https://soundcloud...` - Start playing a track from SoundCloud.

`stop`  - Stop playing track.

