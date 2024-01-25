const move = require("./move.js");

async function tryCollectBlock(bot, targets, max_retry = 3) {
    let retry = 0;

    async function attempt() {
        retry++;
        try {
            await bot.collectBlock.collect(targets, { ignoreNoPath: true });
        } catch (e) {
            if (retry < max_retry) {
                return attempt();
            } else {
                throw e;
            }
        }
    }
    return attempt();
}

async function mineBlock(bot, name, count = 1) {
    const blocks = bot.findBlocks({
        matching: (block) => {
            return block.name === name;
        },
        maxDistance: 32,
        count: count,
    });
    const targets = [];
    for (let i = 0; i < Math.min(blocks.length, count); i++) {
        targets.push(bot.blockAt(blocks[i]));
    }
    result = await bot.collectBlock.collect(targets, { ignoreNoPath: true }).catch(e => {
    })
    bot.chat("ended");
}

module.exports = mineBlock;