const Discord = require('discord.js')
const db = require('megadb')
const client = new Discord.Client()
let dbChannelsBL = new db.crearDB('channelBL')

module.exports = {
  error: async (message, code, err) => {
    let embedError = await new Discord.RichEmbed()
      .setTitle("ERROR")
      .setColor('#d18538') // Naranja
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField("Server", message.guild.name + " | " + message.guild.id)
      .addField("User", message.author +" | "+ message.author.id)
      .addField("Error", code + '\n' +err)
      .addField("Context", message.content)
      .setTimestamp()
    message.channel.send(embedError)
    client.guilds.get("594672292873764876").channels.get("649003749439701012").send(embedError)
  },

  deny: async (message)  => {
    let denyError = await new Discord.RichEmbed()
      .setColor('#cf303a') // Rojo
      .setAuthor(message.author.tag, message.author.avatarURL)
      .addField('Permiso denegado!', 'Permisos insuficientes para ejecutar este comando')
    
    return message.channel.send(denyError)
  }
  
}