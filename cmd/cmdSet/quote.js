const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = {
    name:'quote',
    alias:[],
    description:'',
    usage:'``quote <message id> [channel] [text]``',

    run: async (message, args) => {

        var canal = message.mentions.channels.first() || message.channel

        canal.fetchMessage(args[0]).then(m => {

            // MESSAGE QUOTE
                // Embed quote message
            var quoteEmbed = new Discord.RichEmbed()
                .setColor('#5dbf4e')
                .setAuthor(m.author.tag, m.author.avatarURL)

            // if not message
            if (!args[0]) {
                quoteEmbed.addField("Faltan parametros", "``quote <message id> [channel] [text]``")
                return message.channel.send(quoteEmbed)
            }

            // Text descriptions
            if (m.content != null) quoteEmbed.setDescription(m.content)

            // Get img
            m.attachments.forEach(attachURLm)

            function attachURLm(item) {
                quoteEmbed.setImage(item.url)
            }



            quoteEmbed.setFooter(`#${m.channel.name}`)
            // Embeds
            for (let embed of m.embeds) {
                if (embed.title != undefined) quoteEmbed.setTitle(embed.title)
                if (embed.description != undefined) quoteEmbed.setDescription(embed.description)
                if (embed.url != undefined) quoteEmbed.setURL(embed.url)
                if (embed.author != undefined) quoteEmbed.setAuthor(embed.author.name, embed.author.iconURL)
                if (embed.thumbnail != undefined) quoteEmbed.setThumbnail(embed.thumbnail.url)
                if (embed.image != undefined) quoteEmbed.setImage(embed.image.url)
                if (embed.video != undefined) quoteEmbed.setImage(embed.video.url)
                if (embed.footer != null) {
                    if (embed.footer.text != undefined) quoteEmbed.setFooter(embed.footer.text)
                    if (embed.footer.iconURL != undefined) quoteEmbed.setFooter(embed.footer.iconURL)
                }

                // for (let field of embed.fields) {
                //     if (field.name != null) quoteEmbed.addField(field.name, field.value)
                // }
            }

            quoteEmbed.addField("_ _", `[Ir al mensaje](https://discordapp.com/channels/${m.guild.id}/${canal.id}/${args[0]})`)
            quoteEmbed.setTimestamp()

            // Send quote
            message.channel.send(quoteEmbed).then(() => {message.delete()})

            // MESSAGE USER
            // Embed quote user
            var quoteEmbed2 = new Discord.RichEmbed()
                .setColor('#db5151')
                .setAuthor(message.author.tag, message.author.avatarURL)

            var slice = 0
            if (!message.mentions.channels.first()) slice = 1
            else slice = 2;

            if (!args[slice]) return
            quoteEmbed2.setDescription(args.slice(slice).join(" "))

            message.attachments.forEach(attachURLmsg)
            function attachURLmsg(item) {
                quoteEmbed2.setImage(item.url)
            }
            quoteEmbed2.setTimestamp()
            quoteEmbed2.setFooter(`#${message.channel.name}`)

            message.channel.send(quoteEmbed2)
            return
        })

    }
}