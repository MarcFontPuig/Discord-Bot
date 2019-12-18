const Discord = require('discord.js')
const db = require('megadb')
let dbChannelsBL = new db.crearDB('channelBL')
const client = new Discord.Client()

module.exports = {

    blChannels: async (message, error) => {

        var canal = message.mentions.channels.first() || message.channel
        
        await dbChannelsBL.establecer(`${message.guild.id}`, [])
      
        const datos = await dbChannelsBL.obtener(message.guild.id).catch(err => error(message, "Obtener canales BL 002", err))
        
        if (message.content.startsWith(message.prefix + 'channel-disable') && message.member.hasPermission('ADMINISTRATOR')) {

            if (datos.includes(canal.id)) return message.channel.send("Ya tenia bloqueado este canal...")

            
            dbChannelsBL.push(`${message.guild.id}`, canal.id).catch(err => error(message, "Push canal BL 001", err))
            
            return message.channel.send('De acuerdo, no acataré órdenes en este canal')
        }


        if (message.content.startsWith(message.prefix + 'channel-enable') && message.member.hasPermission('ADMINISTRATOR')) {

            if (!datos.includes(canal.id)) return message.channel.send("Ya me podías ejecutar, pero gracias por intentarme liberar")

            if (dbChannelsBL.tiene(`${message.guild.id}`)) {
                dbChannelsBL.extract(`${message.guild.id}`, canal.id).catch(err => error(message, "Extract canal BL 001", err))
            }
            return message.channel.send('Ya puedes volver a usarme')
        }


    }
}