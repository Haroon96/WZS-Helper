import fetch from 'node-fetch';
import { CommandArgs } from '../common/types';

export function trimWhitespace(str: string): string {
    // remove extra, leading, and trailing whitespace
    return str.replace(/\s+/g, ' ').trim();
}

export async function request(url: string): Promise<any> {
    const response = await fetch(url, {
        credentials: "include",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en",
            "User-Agent": "haroon96/warzone-stats"
        },
        method: "GET",
        mode: "cors"
    });
    return await response.json();
}

export function parseArgs(args): CommandArgs {
    
    if (!args) args = {};
    
    const parsedArgs: CommandArgs = {
        mode: args.modeId,
        newModeId: args.newModeId
    };

    return parsedArgs;
}
