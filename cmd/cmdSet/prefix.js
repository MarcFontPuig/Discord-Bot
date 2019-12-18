const Discord = require('discord.js')
const db = require('megadb')
let dbprefix = new db.crearDB('prefix')

var { deny } = require('../../logs.js')

module.exports = {
    name:'prefix',
    alias:[],
    description:'Cambiar el prefixo',
    usage:'``prefix <new prefix>``',
  
    run: async (message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);
        
        if (!args[0])
            return message.channel.send("Debes introducir el nuevo prefijo\n``prefix <new prefix>``")

        let pr = args.join(' ')
        dbprefix.establecer(`${message.guild.id}`, pr)
        return message.channel.send(`Prefijo cambiado correctamente a \`\`${pr}\`\``)
    }
}