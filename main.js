const mason = require('./mason');

const HOST = "localhost";
const PORT = "25565";
const BOT_USERNAME = "hogehoge@outlook.jp";
const PASSWORD = "pass123";
const VERSION = "1.19.4";
const PLAYER_NAME = "player";
const PLAYER_GOAL = "Get diamond";


mason.startMason(HOST, PORT, BOT_USERNAME, PASSWORD, VERSION, PLAYER_NAME, PLAYER_GOAL, (error) => {
  if (error) {
      console.log(error)
  }
});

console.log('Mason starting up...');