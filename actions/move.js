const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals: { GoalNear, GoalFollow }, goals } = require('mineflayer-pathfinder');
const { Vec3 } = require('vec3');

async function move_to_position(bot, x, y, z, range = 1) {
    try{
        await bot.pathfinder.goto(new GoalNear(x, y, z, range));
    }
    catch(e){   
    }
}

async function move_to_position_vec3(bot, position, range = 1, can_dig = true, dig_cost=1, place_cost =1) {
    const mv = new Movements(bot);

    mv.canDig = can_dig;
    mv.digCost = dig_cost;
    mv.placeCost = place_cost;

    bot.pathfinder.setMovements(mv);
    try{
        await bot.pathfinder.goto(new GoalNear(position.x, position.y, position.z, range));
    }
    catch(e){   
    }
}

async function move_to_player(bot, player_name, range = 2) {
    const target = bot.players[player_name]?.entity;
    try{
        await bot.pathfinder.goto(new GoalFollow(target, range));
    }
    catch(e){   
    }
}

async function move_to_block(bot, block) {
    const mcData = require('minecraft-data')(bot.version);
    const movements = new Movements(bot, mcData);

    const target = bot.blockAt(block.position);

    movements.blocksToAvoid = new Set();

    bot.pathfinder.setMovements(movements);
    try{
        await bot.pathfinder.setGoal(new GoalNear(target.position.x, target.position.y, target.position.z, 1));
    }
    catch(e){
    }
}

module.exports = {
    move_to_position,
    move_to_position_vec3,
    move_to_player,
    move_to_block
}