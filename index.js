const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;

var count = 0;
var cookieImg = "https://vignette.wikia.nocookie.net/creepypasta/images/8/81/Panel-cookie-choc-cookie.png/revision/latest?cb=20160111144002";
var foreverAlone = "http://i3.kym-cdn.com/photos/images/newsfeed/000/150/505/f30fd24c56e1bcfc926883d6a51d5a00.gif";
var butter = "<:butter:376775465370779649>";
var embed;

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame("?help");
});

client.on('message', message => {
  if (message.channel.type !== "text") return;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  	switch(command) {
  		case "ping":
  			message.reply();
  			break;
  		case "hi":
  			if (args[0] == null) {
          message.channel.send(`Hello there ${message.author}!`);
        } else if (args[0] == message.author) {
          message.channel.send(foreverAlone);
        } else if (args[0] == message.mentions.members.first() && args.length > 0 && args[0] != client.user) {
          message.channel.send(`${message.author} said hi to ${message.mentions.members.first()}:wave:`);
        } else if (args[0] == client.user) {
          message.channel.send("I won't talk to you.")
  			} else if (args[0] == "sexy") {
          message.channel.send("hey bby <3")
        } else {
          return;
        }
  			break;
  		case "about":
        embed = new Discord.RichEmbed()
  			.addField(`${butter}ButterBot for all your butter needs ${butter}`,
          `Currently serving ${client.users.length} users in ${client.channels.length} channels on ${client.guilds.length} servers`)
        .setColor("F3EF7D");
        message.channel.send(embed);
  			break;
  		case "count":
  			count++;
  			message.channel.send(`Current count: ${count}`);
  			if (count == 3) {
  				message.channel.send(`Congratulations ${message.author}! You won a cookie!\n${cookieImg}`);
  			}
  			break;
  		case "help":
  			embed = new Discord.RichEmbed()
  			.setAuthor("Commands", "https://n6-img-fp.akamaized.net/free-icon/white-question-mark-on-a-black-circular-background_318-35996.jpg?size=338&ext=jpg")
  			.setDescription("`+help`\n`+ping`\n`+hi <someone>`\n`+count`")
  			.setFooter("ButterBot v1.0 by omer03")
  			message.channel.send(embed);
  			break;
  		default:
  			message.channel.send("Invalid command.");
  	}
});

client.login(token);
