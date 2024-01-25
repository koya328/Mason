const mineflayer = require('mineflayer');
const { Vec3 } = require('vec3')
var mcData;

const move = require('./move.js');

async function closeChest (chest) {
    await chest.close()
}

async function get_item_chest(bot, chest_position, item_dict) {
    mcData = require('minecraft-data')(bot.version);

    await move.move_to_position_vec3(bot, chest_position);
    const chestBlock = bot.blockAt(chest_position);
    const chest = await bot.openContainer(chestBlock);
    for (const name in item_dict) {
        const itemByName = mcData.itemsByName[name];
        const item = chest.findContainerItem(itemByName.id);
        try{
            await chest.withdraw(item.type, null, item_dict[name]);
        }
        catch(e){}
    }
    await closeChest(chest);
}

async function deposit_item_chest(bot, chest_position, item_dict) {
    mcData = require('minecraft-data')(bot.version);

    await move.move_to_position_vec3(bot, chest_position);
    const chestBlock = bot.blockAt(chest_position);
    const chest = await bot.openContainer(chestBlock);
    for (const name in item_dict) {
        const itemByName = mcData.itemsByName[name];
        const item = bot.inventory.findInventoryItem(itemByName.id);
        try{
            await chest.deposit(item.type, null, item_dict[name]);
        }
        catch(e){}
    }
    await closeChest(chest);
}

async function check_item_chest(bot, chest_position) {
    await move.move_to_position_vec3(bot, chest_position);
    const chestBlock = bot.blockAt(chest_position);
    const chest = await bot.openContainer(chestBlock);
    await closeChest(chest);
}

module.exports = {
    get_item_chest,
    deposit_item_chest,
    check_item_chest
}