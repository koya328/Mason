const mineflayer = require('mineflayer');
const { Vec3 } = require('vec3')
const move = require('./move.js');
var mcData;

async function craftItem(bot, name, count = 1) {
    mcData = require('minecraft-data')(bot.version);

    const item = mcData.itemsByName[name];
    const craftingTable = bot.findBlock({
        matching: mcData.blocksByName.crafting_table.id,
        maxDistance: 64,
    });
    try{
        await move.move_to_block(bot,craftingTable);
    }catch(e){
        bot.chat("No Crafting Table nearby.");
        return;
    }

    bot.chat(`Craft ${name}`);
    try{
        const recipe = bot.recipesFor(item.id, null, 1, craftingTable)[0];
        await bot.craft(recipe, count, craftingTable);
        bot.chat(`crefted`);
    }catch(e){
        bot.chat(`I couldn't craft...`);
    }
}

module.exports = craftItem;