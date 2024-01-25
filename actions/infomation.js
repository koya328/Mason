const mineflayer = require('mineflayer');

async function logout(bot){
    bot.chat('bye!');
    bot.quit();
}

async function chat_position(bot){
    bot.chat(`I am at ${bot.entity.position}`);
}

function inventory(bot){
    const items = {};
    for (const item of bot.inventory.items()) {
        if (item) {
            if (items[item.name]) items[item.name] += item.count;
            else items[item.name] = item.count;
        }
    }
    return items;
}

async function chat_inventory(bot){
    bot.chat('I have');
    var items = inventory(bot);
    
    var string = ""
    for (const name in items) {
        string += `${name} x${items[name]}, `;
    }
    bot.chat(string);
}

module.exports = {
    logout,
    chat_position,
    inventory,
    chat_inventory,
};