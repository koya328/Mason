async function smeltItem(bot, itemName, fuelName, count = 1) {
    const item = mcData.itemsByName[itemName];
    const fuel = mcData.itemsByName[fuelName];
    const furnaceBlock = bot.findBlock({
        matching: mcData.blocksByName.furnace.id,
        maxDistance: 32,
    });
    await bot.pathfinder.goto(
        new GoalLookAtBlock(furnaceBlock.position, bot.world)
    );
    const furnace = await bot.openFurnace(furnaceBlock);
    for (let i = 0; i < count; i++) {
        await furnace.putFuel(fuel.id, null, 1);
        await furnace.putInput(item.id, null, 1);
        await bot.waitForTicks(12 * 20);
        await furnace.takeOutput();
    }
    await furnace.close();
}

module.exports = smeltItem;