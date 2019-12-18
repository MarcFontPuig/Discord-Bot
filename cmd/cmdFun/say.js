const Discord = require('discord.js')

module.exports = {
  name:'!say',
  alias:[],
  description:'Repite el mensaje escrito y elimina el mensaje del usuario',
  usage:'``say <argumentos>``',
  
  run: (message, args) => {
    
    if (message.mentions.channels.first() && message.member.hasPermission("ADMINISTRATOR")){
      message.mentions.channels.first().send(args.slice(1).join(" "))
    } else {
      message.channel.send(args.join(" "))
    }
    
  }
} 