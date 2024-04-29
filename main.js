const mason = require('./mason');

const HOST = "localhost";
const PORT = "25565";
const BOT_USERNAME = "Mason";
const PASSWORD = null;
const VERSION = "1.19.4";
const PLAYER_NAME = "koya328";
const PLAYER_GOAL = "Get diamond";
const AUTH = 'offline';

mason.startMason(HOST, PORT, BOT_USERNAME, PASSWORD, VERSION, PLAYER_NAME, PLAYER_GOAL, AUTH, (log) => {
  if (log) {
      console.log(log)
  }
});

console.log('Mason starting up...');