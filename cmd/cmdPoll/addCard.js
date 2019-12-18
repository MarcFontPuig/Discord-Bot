const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('megadb')
let poll = new db.crearDB('polls')

var { error, deny } = require('../../logs.js')

module.exports = {
    name:'addcard',
    alias:['newcard'],
    description:'Añadir una nueva carta personalizada',
    usage:'``addcard``',
  
    run: async (message, args) => {

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return deny(message);
        
        if (!poll.tiene(`${message.guild.id}.polls`))
            return message.channel.send('Debes crear una poll ``'+ message.prefix+'createPoll``')

        var rank = await poll.obtener(`${message.guild.id}.rank`)
        var polls = await poll.obtener(`${message.guild.id}.polls`)

        var totalKeys = 0
        polls.forEach(async pollCmd => {
            pollCmd.forEach(async pollName => {
                var totalKeys = totalKeys + await poll.keys(`${message.guild.id}.polls.${pollCmd}.${pollName}`)
            })
        });

        if (rank == "Normal" && totalKeys >= 50 || rank == "VIP" && totalKeys >= 100) {
            return message.channel.send("Máximo de imagenes llegado")
        }
        
        // let selectPollEmbed = new Discord.RichEmbed()
        //     .setTitle("Añadir imagen")
        //     .setDescription("Introduce el número de la colección que desea añadir la imagen")
        // let num = 1;
        // polls.forEach(async pollCmd => {
        //     pollCmd.forEach(async pollName => {
        //         selectPollEmbed.addField(`${num})`, pollName)
        //     })
        // });


        const filter = (reaction, user) => {
            return (reaction.emoji.name === "firefoxRed" || reaction.emoji.name === "firefoxBlue") && user.id === message.author.id;
        }

        const card = mensaje.createReactionCollector(filter, { max: 1 })
                  
    }
}