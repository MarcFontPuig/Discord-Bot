// Modulos
const Discord = require("discord.js");
const fs = require("fs");
const db = require("megadb");

const client = new Discord.Client();
client.command = new Discord.Collection();


// Command handler
const commandSet = fs.readdirSync("./cmd/cmdSet").filter(f => f.endsWith(".js"));
for (const fileSet of commandSet) {
  let commandSetting = require(`./cmd/cmdSet/${fileSet}`);
  client.command.set(commandSetting.name, commandSetting);
}

const commandPoll = fs.readdirSync("./cmd/cmdPoll").filter(f => f.endsWith(".js"));
for (const filePoll of commandPoll) {
  let commandPolls = require(`./cmd/cmdPoll/${filePoll}`);
  client.command.set(commandPolls.name, commandPolls)
}

const commandFun = fs.readdirSync("./cmd/cmdFun").filter(f => f.endsWith(".js"));
for (const fileFun of commandFun) {
  let commandFuns = require(`./cmd/cmdFun/${fileFun}`);
  client.command.set(commandFuns.name, commandFuns)
}

const commandGame = fs.readdirSync("./cmd/cmdGame").filter(f => f.endsWith(".js"));
for (const fileGame of commandGame) {
  let commandGames = require(`./cmd/cmdGame/${fileGame}`);
  client.command.set(commandGames.name, commandGames)
}

// Connections
const vida = require("./vida.js");


// Exports
const { blChannels } = require("./cmd/settings/channels.js");
const { error } = require("./logs.js")

const { snowFight } = require("./snow.js")
const { cosasNazis } = require("./cosasNazis.js")


// Bases de Datos
let dbprefix = new db.crearDB("prefix");
let dbChannelsBL = new db.crearDB("channelBL");


client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
});


client.on("message", async message => {
  if (message.guild === undefined) return;
  if (message.author.id === client.user.id) return;

  // Configuración del prefijo y comandos

  if (dbprefix.tiene(`${message.guild.id}`)) {
    message.prefix = await dbprefix.obtener(`${message.guild.id}`).catch(err => error(message, "Obtener prefijo DB 001", err));
    // console.log('Prefix DB: '+prefix)
  } else {
    message.prefix = process.env.PREFIX;
    // console.log('Prefix base: '+prefix)
  }
  
  const args = message.content.slice(message.prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
  

  // Know Prefix
  if (
    message.content.toLowerCase().includes(client.user.id) &&
    message.content.toLowerCase().includes("prefix")
  ) {
    return message.channel.send("Mi prefijo es ``" + message.prefix + "``");
  }

  // Black List Channels
  blChannels(message, error);
  var datos;
  if (dbChannelsBL.tiene(message.guild.id)) {
    datos = await dbChannelsBL.obtener(message.guild.id).catch(err => error(message, "Obtener canales BL 001", err));
  }

  // Prevención de Bucles y canales
  if (
    message.author == client.user ||
    datos.includes(message.channel.id) ||
    message.author.bot
  ) {
    return;
  }

  snowFight(message)
  //cosasNazis(client, message)
  let cmd = client.command.get(command) || client.command.find(c => c.alias.includes(command));
  if (cmd && message.content.toLowerCase().startsWith(message.prefix)) {
    // let alias = cmd.alias;
    // let name = cmd.name;
    // let description = cmd.description;
    // console.log(alias, name, description)
    return cmd.run(message, args);
  }

});

// Connect token
let bot_token = process.env.TOKEN;
client.login(bot_token);
