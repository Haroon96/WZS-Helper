export type GameMode = 'br' | 'rmbl' | 'plndr' | 'rsg';
export type Platform = 'psn' | 'xbl' | 'atvi';

export type CommandArgs = {
    mode: GameMode,
    newModeId: string
};

export type Command = {
    method: Function;
    usage: string;
    help: string;
    regex: Array<RegExp>;
};

export type Player = {
    playerId: string;
    platformId: Platform;
    avatarUrl?: string;
};

export type Schedule = {
    cron: string,
    command: string
};

export type MatchModes = {
    modeName: string,
    modeId: string
};