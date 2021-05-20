import { MatchModes, Player } from "../common/types";
import { request } from "../utilities/util";

export async function getMatchModes(player: Player): Promise<Array<MatchModes>> {
    // get matches from tracker.gg api
    const url = `https://api.tracker.gg/api/v2/warzone/standard/matches/${player.platformId}/${encodeURIComponent(player.playerId)}?type=wz&next=null`;
    const res = await request(url);

    if (res.errors) {
        throw res.errors[0];
    }

    // map to MatchMode type
    const matchModes: Array<MatchModes> = res.data.matches.map(x => ({
        modeId: x.attributes.modeId,
        modeName: x.metadata.modeName
    }));

    return matchModes;
}

export async function getWeeklyLeaderboard(): Promise<Array<Player>> {
    const url = "https://api.tracker.gg/api/v1/warzone/standard/leaderboards?type=stats&platform=all&board=WeeklyKills&skip=0&take=20";
    const res = await request(url);

    if (res.errors) {
        throw res.errors[0];
    }

    const players: Array<Player> = res.data.items.map(x => ({
        playerId: x.owner.metadata.platformUserHandle,
        platformId: x.owner.metadata.platformSlug
    }));

    return players;
}