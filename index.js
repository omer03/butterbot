const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = config.token;
const prefix = config.prefix;

var count = 0;
var cookieImg = "https://vignette.wikia.nocookie.net/creepypasta/images/8/81/Panel-cookie-choc-cookie.png/revision/latest?cb=20160111144002";
var foreverAloneImg = "http://i3.kym-cdn.com/photos/images/newsfeed/000/150/505/f30fd24c56e1bcfc926883d6a51d5a00.gif";
var questionMarkIcon = "https://n6-img-fp.akamaized.net/free-icon/white-question-mark-on-a-black-circular-background_318-35996.jpg?size=338&ext=jpg";
var purposeImg = "https://images.lookhuman.com/render/standard/e9kzW1RKcbJOVn5b7gh9eL2KQzpctmZG/greetingcard45-off_white-z1-t-butter-robot.png";
var butterEmote = "<:butter:376775465370779649>";
var embed;
var lastUser;

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame("Type ?help");
});

client.on('message', message => {
  if (message.channel.type !== "text") return;
	if (!message.content.startsWith(prefix) || message.author.bot) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();

  	switch(command) {
      case "butter":
        message.channel.send(purposeImg);
        break;
  		case "ping":
        message.channel.send('Pinging server...').then((msg) => {
        msg.edit(`Pong! Your latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        });
  			break;
  		case "hi":
        if (args[0] == "sexy") {
          message.channel.send("hey bby <3")
        } else if (message.mentions.users.size == 0) {
            message.reply(` please mention someone to be greeted.`);
        } else if (args[0] == message.author) {
          message.channel.send(foreverAloneImg);
        } else if (args[0] == message.mentions.members.first() && args.length > 0 && args[0] != client.user) {
          message.channel.send(`${message.author} said hi to ${message.mentions.members.first()}:wave:`);
          message.delete();
        } else if (args[0] == client.user) {
          message.channel.send("I won't talk to you.")
        } else {
          return;
        }
  			break;
  		case "about":
        embed = new Discord.RichEmbed()
  			.addField(`${butterEmote}ButterBot for all your butter needs ${butterEmote}`,
          `Serving butter to **${client.users.size}** users in **${client.channels.size}** ` +
          `channels on **${client.guilds.size}** servers.\n\n*What is my purpose?*`)
          .setFooter("ButterBot v1.0 by omer03")
        .setThumbnail(purposeImg)
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
      case "type":
        let randomWord = Math.random().toString(36).replace(/[^a-z]+/g, '');
        let timer = 3;
        var interval;
        message.channel.send("Generating a new word..")
          .then((msg)=> {
            interval = setInterval(function () {
              msg.edit(`Starting in **${timer--}**..`)
            }, 1000)
          });
        setTimeout(function() {
          clearInterval(interval);
          message.channel.send(randomWord)
          .then(() => {
            message.channel.awaitMessages(response => response.content === randomWord && response.author == message.author, {
              max: 1,
              time: 5000,
              errors: ['time'],
            })
            .then((msg) => {
              message.channel.send(`You got it in time!`);
            })
            .catch(() => {
              message.channel.send('You\'re too slow.');
            });
          });
        }, 4000);
        break;
  		case "help":
  			embed = new Discord.RichEmbed()
  			.setAuthor("Commands List", questionMarkIcon)
        .setDescription("**`ping`**: Check your latency\n" +
          "**`hi [mention]`**: Greet someone\n" +
          "**`about`**: About ButterBot\n" +
          "**`count`**: Add 1 to the counter\n" +
          "**`type`**: A typing minigame\n" +
          "**`help`**: Commands list")
        .setColor("F3EF7D");
  			message.channel.send(embed);
  			break;
  		default:
  			message.channel.send("Invalid command.");
  	}
});

client.login(token);
