                //  Author: DarkSpace

// NodeJS
const Discord = require('discord.js')
const client = new Discord.Client()


// Iniciar el BOT (Información sobre los Servers y el BOT)
client.on('ready', () => {
  console.log("Nombre del BOT: " + client.user.tag) /
  console.log("Servidores:")
  client.guilds.forEach((guild) => {
    console.log(" NS - " + guild.name)
    guild.channels.forEach((channel) => {
      console.log(` NCS -- ${channel.name} (${channel.type}) - ${channel.id}`)
    })
  })
  var generalChannel = client.channels.get("555864606992760834")
  generalChannel.send("  --MONIKA ACTIVADA--  ")
})


// Hablar en el chat
client.on('message', (receivedMessage) => {
    //Prevencion de bucle
    if (receivedMessage.author == client.user) {
        return
    }

    // Al mencionar el BOT
    if (receivedMessage.content.includes(client.user.toString())) {
      receivedMessage.channel.send("**CALLATE** " + receivedMessage.author.toString() + " **NO ME IMPORTA!**")
    }
  
    // Al poner {
    if (receivedMessage.content.startsWith("{")) {
      processCommand(receivedMessage)
    }

    // Si pone Monika
    if (receivedMessage.content.includes("Monika")) {
      receivedMessage.channel.send("Just Monika")
    }

    // Responder el mismo mensaje     receivedMessage.channel.send(receivedMessage.content)
})


// Comandos
function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1)
  let splitCommand = fullCommand.split(" ")
  let primaryCommand = splitCommand[0]
  let arguments = splitCommand.slice(1)

  console.log("Command received: " + primaryCommand)
  console.log("Arguments: " + arguments)

  if (primaryCommand == "help") {
    helpCommand(arguments, receivedMessage)
  } else if (primaryCommand == "fruta") {
    fruta(arguments, receivedMessage)
  } else {
    receivedMessage.channel.send("No explores territorios desconocidos")
  }
}

// FUNCIONES DE AYUDA
function helpCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
    receivedMessage.channel.send("¿Necesitas ayuda con " + arguments + "? No se si dartela")
  } else {
    receivedMessage.channel.send("Lista de comandos")
  }
}

// ARRAY FRUTAS
function fruta(arguments, receivedMessage) {
  var frutas = ["Albaricoque", "Cereza", "Ciruela", "Fresa", "Limón", "Mandarina", "Manzana", "Melón", "Pera", "Piña", "Plátano", "Tu eres mi fruta"];
  receivedMessage.channel.send(frutas[Math.floor(Math.random() * frutas.length)])
}


// CLAVES BOT
bot_secret_token = "NTU1ODY2NTIzMzM2NTcyOTY1.XKPJXg.gGAJVCL-JfjExun7LZ868o_I8Uc"
client.login(bot_secret_token)
