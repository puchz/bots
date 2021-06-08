const TelegramBot = require('node-telegram-bot-api');
const weather = require ('weather-js');

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().includes("santo padre")) {
    bot.sendMessage(chatId, 'CHABON mi nombre es BERZERKER');
  }

  if (msg.text.toString().toLowerCase().includes("bambino")) {
    bot.sendMessage(chatId, 'HAHAHA. Etzelente.');
  }

  if (msg.text.toString().toLowerCase().includes("pizza")) {
    bot.sendMessage(chatId, 'Quiero comer pitza HAHAHa.');
  }
});

bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, "Bienvenide al grupo " + msg.chat.name + " estimadisime " + msg.new_chat_members.name);
});

bot.onText(/^\/clima/, function(msg, match){
    var chatId = msg.chat.id;
    var ciudad = "Buenos Aires"
    var comentario = ""

    var opciones = {
        search: ciudad,
        degreeType: 'C', 
        lang: 'es-ES'
    }

    weather.find(opciones, function(err, result) {
        if (err){
            console.log(err);
        } else {
            console.log(result[0]);

            if( result[0].current.temperature <= 16) {
                comentario = "CHABON hoy vamos a tener un dia fresco, por la mañana\n\n"
            }
            else if( 16 < result[0].current.temperature < 27) {
                comentario = "CHABON hoy vamos a tener un dia calido\n\n"
            }
            else {
                comentario = "Hoy va ser un dia muy caluroso. CHABON\n\n"
            }
            
            bot.sendMessage(chatId, comentario + "Lugar: " + result[0].location.name +
            "\n\nTemperatura: " + result[0].current.temperature + "ºC\n" +
            "Visibilidad: " + result[0].current.skytext + "\n" +
            "Humedad: " + result[0].current.humidity + "%\n" +
            "Dirección del viento: " + result[0].current.winddisplay + "\n"
            ,{parse_mode: 'Markdown'});
        }
    })
});

bot.onText(/^\/dado/, (msg) => {
    bot.sendDice(msg.chat.id);
});
