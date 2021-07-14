const TelegramBot = require('node-telegram-bot-api');
const weather = require ('weather-js');
const fetch = require('node-fetch');

const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const API_CHISTES_URI = process.env.API_CHISTES_URI;
if (API_CHISTES_URI === undefined) {
  throw new Error('API chistes URI missing!')
}

const getChiste = (async () => {
    let chiste = await fetch(API_CHISTES_URI).then( res => {
        return res.json();
    }).then(obj => {
        return obj.text;
    });
    return chiste;
});

const getRandomMessage = () =>{
    let messages =
        ["BESOS EN LA COLA!",
         "ESPERO QUE ANDEN BIEN!",
         "AHORA NO SOLO NO PUEDO RESPIRAR SINO QUE TAMBIEN ME DUELE LA PIJA!",
         "ME ESGUILSE!",
         "SALUDOS A TODOS LOS PITOS",
         "TE GUSTAN LOS PEBETES LEA!",
         "ETZELENTE!"];
    return messages[Math.floor(Math.random()*messages.length)];
}

const contarChiste = (msg) =>{
    getChiste().then( chiste => {
        let username = msg.from.first_name || "";
        bot.sendMessage(msg.chat.id,"Escuchate este " + username + ":");
        bot.sendMessage(msg.chat.id, chiste);
        bot.sendMessage(msg.chat.id,"HAHAHAH " + getRandomMessage());
    }).catch(err => {
        console.log(err)
        bot.sendMessage(msg.chat.id,"CHABON ahora no tengo chistes :/");
    });
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
  
  if (msg.text.toString().toLowerCase().includes("pini")) {
    bot.sendMessage(chatId, 'Che y si volvemos a WhatsApp?');
  }
  
  if (msg.text.toString().toLowerCase().includes("chiste")) {
    contarChiste(msg);
  }
  
});

bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, "Bienvenide al grupo " + msg.chat.name + " estimadisime " + msg.new_chat_members.name);
});


bot.onText(/^\/humor/, function(msg, match){
    contarChiste(msg);
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
