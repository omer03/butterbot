const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;

var count = 0;
var cookieImg = "https://vignette.wikia.nocookie.net/creepypasta/images/8/81/Panel-cookie-choc-cookie.png/revision/latest?cb=20160111144002";
var foreverAloneImg = "http://i3.kym-cdn.com/photos/images/newsfeed/000/150/505/f30fd24c56e1bcfc926883d6a51d5a00.gif";
var questionMarkIcon = "https://n6-img-fp.akamaized.net/free-icon/white-question-mark-on-a-black-circular-background_318-35996.jpg?size=338&ext=jpg";
var butterEmote = "<:butter:376775465370779649>";
var embed;
var lastUser;

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
        message.channel.send('Pong...').then((msg) => {
        msg.edit(`Pong! Your latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        });

  			break;
  		case "hi":
  			if (args[0] == null) {
          message.channel.send(`Please mention someone to be greeted.`);
        } else if (args[0] == message.author) {
          message.channel.send(foreverAloneImg);
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
  			.addField(`${butterEmote}ButterBot for all your butter needs ${butterEmote}`,
          `Serving butter to **${client.users.size}** users in **${client.channels.size}** ` +
          `channels on **${client.guilds.size}** servers.\n\n*I need more butter..*`)
        .setThumbnail(message.author.avatarURL)
        .setColor("F3EF7D");
        message.channel.send(embed);
  			break;
  		case "count":
        if (lastUser != message.author) {
  			  message.channel.send(`Current count: ${++count}`);
          if (count == 10) {
       	    message.channel.send(`Congratulations ${message.author}! You won a cookie!\n${cookieImg}`);
            count = 0;
       	  }
        } else {
          message.channel.send("Cannot count more than once. Wait for someone else to count first.");
        }
        lastUser = message.author;
  			break;
  		case "help":
  			embed = new Discord.RichEmbed()
  			.setAuthor("Commands List", questionMarkIcon)
        .setDescription(`Prefix is **${prefix}**`)
        .addField("Command", "`hi`\n`ping`\n`about`\n`count`\n`help`", true)
        .addField("Description", "`Greet someone`\n`Check your latency`\n`About ButterBot`\n" +
          "`Add 1 to the counter`\n`Commands list`", true)
  			.setFooter("ButterBot v1.0 by omer03")
        .setColor("F3EF7D");
  			message.channel.send(embed);
  			break;
  		default:
  			message.channel.send("Invalid command.");
  	}
});

client.login(token);
