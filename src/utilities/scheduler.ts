import { Client } from 'discord.js';
import { scheduleJob } from 'node-schedule';
import { Schedule } from '../common/types';

class _Scheduler {

    async init(client: Client) {
        this.client = client;
        this.createJob({ command: '!wzh findnewmodeids', cron: '0 0 * * *' })
    }

    public createJob(schedule: Schedule) {
        scheduleJob(schedule.cron, () => {
            const channel = this.client.channels.cache.get(process.env.CHANNEL_ID);
            if (channel) {
                // @ts-ignore
                channel.send(schedule.command);
            }
        });
    }
    
    client: Client;
}

export const Scheduler = new _Scheduler();