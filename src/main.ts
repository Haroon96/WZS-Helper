import { Client, Message } from 'discord.js';
import controller from './controller/controller';
import { Scheduler } from './utilities/scheduler';
import { DAL } from './dal/mongo-dal';
import 'dotenv/config';

async function main() {

    // init bot
    const bot = new Client();
    bot.login(process.env.TOKEN);

    // init pre-reqs
    await DAL.init();
    await Scheduler.init(bot);


    bot.on('ready', () => {
        // set bot status
        bot.user.setActivity({ name: "for '!wzh' commands", type: "WATCHING" });
        console.info(`Logged in as ${bot.user.tag}`);
    });
    
    bot.on('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    bot.on('message', async(message: Message) => {
        // check if message is from approved CHANNEL_ID
        if (message.channel.id != process.env.CHANNEL_ID) {
            return;
        }

        // check if the message is intended for the bot
        if (!message.content.startsWith('!wzh')) {
            return;
        } 
        
        // forward to controller
        try {
            await controller(message);
        } catch (e) {
            console.error(e);
        }
    });
}

main();
