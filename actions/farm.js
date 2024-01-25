const mineflayer = require('mineflayer');
const { Vec3 } = require('vec3')
var mcData;

const move = require('./move.js');

async function init(bot){
    mcData = require('minecraft-data')(bot.version);
}

function find_farmland(bot, dist) {
    return bot.findBlock({
        point: bot.entity.position,
        matching: mcData.blocksByName.farmland.id,
        maxDistance: dist,
        useExtraInfo: (block) => {
            const blockAbove = bot.blockAt(block.position.offset(0, 1, 0));
            return !blockAbove || blockAbove.type === 0;
        }
    })
}

function sleep(msec) {
    return new Promise(function(resolve) {
        setTimeout(function() {resolve()}, msec);
    })
}

async function plant(bot){
    await init(bot);
    var end = false

    while(!end){
        for(var i=0;i<30;i++){
            const farmland = find_farmland(bot, 4);
            if(farmland){
                try{
                    await bot.equip(mcData.itemsByName.wheat_seeds.id, 'hand');
                }
                catch(e){
                    bot.chat('I dont have the seeds.');
                    end = true;
                    break;
                }
                try{
                    await bot.placeBlock(farmland, new Vec3(0, 1, 0));
                }
                catch(e){
                    console.log(e);
                }
            }
            else break;
        }
        const b = find_farmland(bot, 32);
        if(b){
            move.move_to_block(bot, b);
            await sleep(1000);
        }
        else end = true;
    }
    bot.chat('finish !');
}

module.exports = plant;