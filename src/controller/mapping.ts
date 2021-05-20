import { Command } from '../common/types';
import * as commands from './commands';

export default new Map<string, Command>([
    ['addmodeid', {
        method: commands.addModeId,
        usage: '!wz addmodeid <modeId> <remoteModeId>',
        help: 'Append a new game mode to a specific modeId',
        regex: [
            /^!wzh addmodeid (?<modeId>br|rmbl|plndr) (?<newModeId>.+)$/
        ]
    }],
    ['findnewmodeids', {
        method: commands.findNewModeIds,
        usage: '!wz findnewmodeids',
        help: 'Search for new mode IDs',
        regex: [
            /^!wzh findnewmodeids$/
        ]
    }]
]);



