const mineflayer = require('mineflayer');
const minecraft_data = require('minecraft-data');

function findBlock(bot, name, count = 1) {
    const blocks = bot.findBlocks({
        matching: (block) => {
            return block.name === name;
        },
        maxDistance: 32,
        count: count,
    });
    const targets = [];
    for (let i = 0; i < Math.min(blocks.length, count); i++) {
        targets.push(bot.blockAt(blocks[i]).position);
    }
    return targets;
}

function get_nearby_blocks(bot, player_name) {
    const player_pos = bot.players[player_name]?.entity.position;
    const range = 10;

    near_blocks = [];
    for (let x = -range; x <= range; x++) {
        for (let y = -range/2; y <= range/2; y++) {
            for (let z = -range; z <= range; z++) {
                const block = bot.blockAt(player_pos.offset(x, y, z));
                if (block.name == 'air') continue;
                near_blocks.push(block.name);
            }
        }
    }
    const unique_near_blocks = [...new Set(near_blocks)];
    return unique_near_blocks;
}

function get_nearby_entity(bot, player_name) {
    const bot_pos = bot.entity.position;
    const player_pos = bot.players[player_name]?.entity.position;
    const range = 32;

    const near_entities = Object.values(bot.entities).filter(entity => {
        if (entity.type === 'player') return false;
        if (entity.name === 'item') return false;
        if (entity.name === 'snowball') return false;

        const distance = player_pos.distanceTo(entity.position);
        return distance <= range;
    }).map(entity => {
        return entity.name;
    });

    const unique_near_entities = [...new Set(near_entities)];
    return unique_near_entities;
}

function biome_at(bot, player_name) {
    const mcData = minecraft_data(bot.version);
    const block_at = bot.blockAt(bot.players[player_name]?.entity.position);
    const biome = mcData.biomes[block_at.biome.id]
    return biome.name
}

function get_item_name(bot, item_id) {
    const mcData = minecraft_data(bot.version);
    const item = mcData.itemsArray.find(x => x.id === item_id);
    return item ? item.name : null;
}

function get_equip(entity) {
    const equip = entity.equipment.filter(item => item && item.name).map(item => item.name);
    return equip
}

function player_collect(bot, username) {
    bot.on('playerCollect', (collector, collected) => {
        if (collector.username !== username)
            return;
        const metadataItem = collected.metadata.find(item => item && item.present === true);
        const item_id = metadataItem ? metadataItem.itemId : undefined;
        const item_name = get_item_name(bot, item_id);

        const uniqueSet = new Set([...bot.collected_item, item_name]);
        bot.collected_item = Array.from(uniqueSet);
    });

    bot.on('entityEquip', (entity) => {
        if (entity.username !== username)
            return;
        const equip = get_equip(entity);

        const uniqueSet = new Set([...bot.collected_item, ...equip]);
        bot.collected_item = Array.from(uniqueSet);

    });
}

function make_jsondata(bot, player_name, goals = "" ,conversation = "") {
    const mcData = minecraft_data(bot.version);

    const json_data = {
        goals: goals,
        conversation: conversation,
        biome: biome_at(bot, player_name),
        time: bot.time.timeOfDay,
        blocks: get_nearby_blocks(bot, player_name),
        entities: get_nearby_entity(bot, player_name),
        health: null, //未実装
        hunger: null, //未実装
        pos: pos = bot.players[player_name]?.entity.position,
        equip: get_equip(bot.players[player_name]?.entity),
        collected: bot.collected_item,
        chest: findBlock(bot, "chest", 3)
    };

    return json_data
}


module.exports = {
    player_collect,
    make_jsondata
};