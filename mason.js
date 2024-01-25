const mineflayer = require('mineflayer');
const { PythonShell } = require('python-shell');
const { pathfinder, Movements, goals: { GoalNear, GoalFollow }, goals } = require('mineflayer-pathfinder');
const collectBlock = require('mineflayer-collectblock').plugin;
const { Vec3 } = require('vec3')
const fs = require('fs');
const path = require('path');

const chest = require("./actions/chest.js");
const move = require("./actions/move.js");
const craftItem = require("./actions/craftItem.js");
const farm = require("./actions/farm.js");
const infomation = require("./actions/infomation.js");
const mineBlock = require("./actions/mineBlock.js");
const send_data = require("./actions/send_data.js");


const AUTH = 'microsoft';

const pyshell = new PythonShell('./interaction.py');
const build_shell = new PythonShell('./build.py');

module.exports.startMason = (HOST, PORT, BOT_USERNAME, PASSWORD, VERSION, PLAYER_NAME, PLAYER_GOAL, callback) => {
  try {
      const bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: BOT_USERNAME,
        //password: PASSWORD,
        version: VERSION,
        auth: AUTH
      });
      bot.loadPlugin(pathfinder)
      bot.loadPlugin(collectBlock)

      function my_bot_member_init(bot){
        bot.is_structure_list = false;
        bot.is_build_mode = false;
        bot.collected_item = [];
        bot.function = "";
      }
      
      function request_next_task(){
        if(bot.is_build_mode) return;
      
        const json_data = send_data.make_jsondata(bot, PLAYER_NAME, PLAYER_GOAL, "please give me next task");
        const json_string = JSON.stringify(json_data, null, 0);
        pyshell.send(json_string);
      }
      
      function player_exist_check(){
        if(!(PLAYER_NAME in bot.players)){
          bot.chat("I'm logged out because the player doesn't exist.");
          bot.quit();
        }
      }

      bot.on('error', function (err) {
        console.log(err.message);
      });
      
      bot.once('login', () => {
        my_bot_member_init(bot);
        bot.chat(`Hi ${PLAYER_NAME}!`);
        bot.chat(`/mvtp ${PLAYER_NAME}`);
        bot.chat(`/tp ${PLAYER_NAME}`);
      
        pyshell.on('message', function (data) {
          if (data.startsWith("[act]")) {
            bot.chat("Can I help you work with the following functions? y/n");
            data = data.replace("[act]",""); 
            bot.function = data
            bot.chat(data)
            return;
          }
          
          bot.chat(data);
        });
      
        build_shell.on('message', function(data){
          const fill = data.indexOf("/fill");
          if(fill!==-1){
            cmd = data.slice(fill);
            bot.chat(cmd)
          }
          const setblock = data.indexOf("/setblock");
          if(setblock!==-1){
            cmd = data.slice(setblock);
            bot.chat(cmd)
          }
        });
      
        setInterval(player_exist_check,5*1000);
        setInterval(request_next_task,3*60*1000);
      });
      
      bot.on('chat', (username, message) => {
        if (username === bot.username || username !== PLAYER_NAME)
          return;
        
        split_msg = message.split(" ");
        
        if(split_msg[0] === "quit"){
          bot.chat("bye!");
          bot.quit();
        }
      
        if(bot.function !== "" && split_msg[0] === "y"){
          func = bot.function
          bot.function = "";
          func = func.replace(/'/g, '"');
          func = func.replace(")","");
          func = func.split("(");
          args = JSON.parse(func[1])
          switch(func[0]){
            case "mine_block":
              mineBlock(bot, args.item, args.count);
              break;
          }
          return;
        }
        else if(split_msg[0] === "n"){
          bot.function = "";
          return;
        }
      
        if(split_msg[0] == "build"){
          bot.is_build_mode = bot.is_build_mode ? false : true
          if(bot.is_build_mode)
            bot.chat("build mode starts.")
          else
            bot.chat("build mode ended.")
          return;
        }
        if(bot.is_build_mode === true){
          build_shell.send(message);
          return;
        }
        
        const json_data = send_data.make_jsondata(bot, PLAYER_NAME, PLAYER_GOAL, message);
        const json_string = JSON.stringify(json_data, null, 0);
        pyshell.send(json_string);
      });
      
      bot.on('end', (reason) => {
        process.exit(1);
      });

      callback(null);

  } catch (error) {
      callback(error);
  }
};