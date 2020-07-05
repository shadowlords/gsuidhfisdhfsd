const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
const chalk = require('chalk');
const got = require('got');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready!');
let logchannel = client.channels.get('727050928544546856');
  logchannel.send(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setStatus('online');
client.user.setActivity("the cool users of brogl", { type: "WATCHING" });
});

client.on("message", async message => {
    if(message.author.bot) return;
    const prefix = config.prefix;
    if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.replay('I can\'t execute the command inside DMS!');
    }
    try {
        command.execute(client, config, message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute the command!');
    }
});

client.on('message', async message => {
	if(message.channel.type === "dm")
		var logchannel = client.channels.get('727050928544546856');
await logchannel.send(`[${message.author.tag}]: ${message.content}`);
});

client.on('message', async message => {
	if(message.author.bot) return;
	if(message.content.includes(`who asked`)) {
	message.channel.send(`Shut the fuck up. We don't care <@!${message.author.id}> if anyone asked or not. just shut up. the world isn't just about you. just don't.`)
}
if(message.content.includes(`didnt ask`)) {
	message.channel.send(`Shut the fuck up. We don't care <@!${message.author.id}> if anyone asked or not. just shut up. the world isn't just about you. just don't.`)
}

if(message.content.includes(`didn't ask`)) {
	message.channel.send(`Shut the fuck up. We don't care <@!${message.author.id}> if anyone asked or not. just shut up. the world isn't just about you. just don't.`)
}

if(message.content.includes(`did not ask`)) {
	message.channel.send(`Shut the fuck up. We don't care <@!${message.author.id}> if anyone asked or not. just shut up. the world isn't just about you. just don't.`)
}

if(message.content.includes(`did i ask`)) {
message.channel.send(`shut the fuck up.we don't care <@${message.author.id}> if anyone asked or not. just shut up. the world isn't about you. just shut the fuck up and don't`)
}

if(message.content.includes('<@!265953382441680907>')) {
    if(!message.author.id === "655714844695330854") return
	message.channel.send(`stfu? :clown:`)
}

if(message.content.includes('<@!655714844695330854>')) {
    if(!message.author.id === "265953382441680907") return
	message.channel.send(`stfu? :clown:`)
}

if(message.content.includes('<@!714874905669402634>')) {
	message.channel.send(`my prefix here is ${config.prefix}`)
}
});

client.on("messageDelete", async msg => {
  let logs = await msg.guild.fetchAuditLogs({type: 72});
  let entry = logs.entries.first();

  let embed = new Discord.RichEmbed()
    .setTitle("**DELETED MESSAGE**")
    .setColor("0x800000")
    .addField("Author", msg.author.tag, true)
    .addField("Channel", msg.channel, true)
    .addField("Message", msg.content)
  .setTimestamp()
    .setFooter(`Message ID: ${msg.id} | Author ID: ${msg.author.id}`);
	var logchannel = client.channels.get('727050928544546856');
    logchannel.send({embed}).catch(err)
});

client.login(process.env.BOT_TOKEN);
