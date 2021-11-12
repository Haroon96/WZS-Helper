import { Message } from "discord.js";
import { CommandArgs, Player } from "../common/types";
import { DAL } from "../dal/mongo-dal";
import { getMatchModes, getWeeklyLeaderboard } from "../cod/api";
import fetch from 'node-fetch';

export async function addModeId(message: Message, args: CommandArgs) {
    const { mode, newModeId } = args;
    await DAL.addModeId(mode, newModeId);
    await message.reply(`Added \`${newModeId}\` to ${mode}!`);
}

export async function findNewModeIds(message: Message, args: CommandArgs) {
    message.reply("Finding new mode IDs!");
    
    // get current mode ids
    const currentModeIds = [];
    currentModeIds.push(...await DAL.getModeIds('br'));
    currentModeIds.push(...await DAL.getModeIds('rmbl'));
    currentModeIds.push(...await DAL.getModeIds('plndr'));
    currentModeIds.push(...await DAL.getModeIds('rsg'));

    // get top players
    const topPlayers: Array<Player> = await getWeeklyLeaderboard();

    const newModes: Map<string, string> = new Map<string, string>();

    // find matches for each player
    for (let i = 0; i < topPlayers.length; ++i) {
        try {
            let modes = await getMatchModes(topPlayers[i]);
            // filter out unseen modes
            modes = modes.filter(x => !currentModeIds.includes(x.modeId));
            // add unseen modes to newModes
            for (let j = 0; j < modes.length; ++j) {
                const { modeId, modeName } = modes[j];
                newModes.set(modeId, modeName);
            }    
        } catch (e) {
            console.error(e);
        }
    }

    // send responses
    await newModes.forEach((v, k) => {
        message.reply(`New modeId for ${v} : \`${k}\``);
    });
}

export async function getGuildCount(message: Message, args: CommandArgs) {
    const getGuilds = async(after: string) => {
        let url = 'https://discord.com/api/v6/users/@me/guilds';
        if (after)  url = url + '?after=' + after;
        const request = await fetch(url, {
            'headers': {
                'Authorization': `Bot ${process.env.WZS_TOKEN}`
            }
        });    
        return await request.json();
    };

    let after = '';
    let guildCount = 0;

    while (true) {
        // get guilds after 'after' guild
        let response = await getGuilds(after);

        // get count of guilds from response
        let pageCount = response.length;

        // if the page has 0 guilds, break loop
        if (pageCount == 0) break;

        // update guild count
        guildCount += pageCount;

        // setup for next query
        after = response[response.length - 1].id;   
    }

    await message.reply(`Warzone Stats is in ${guildCount} guilds!`);
} 