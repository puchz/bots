const TelegramBot = require('node-telegram-bot-api');
const weather = require ('weather-js');
const fetch = require('node-fetch');
const diainternacional = require('./diainternacional');

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
         "ETZELENTE!",
		 "CUIDATE LA COLA CHABON",
         "NO SE COMAN A MI HERMANA CHABON"];
    return messages[Math.floor(Math.random()*messages.length)];
}

const getRandomLyrics = () =>{
    let messages =
        ["Es un angel que va cabalgando cabalgando con brio y valor va cantando las tristes historias de una guerra que ya terminó.",
		 "primavera lejos de mi patria primavera lejos de mi amor primavera sin flores y sin risas primavera a orillas del volchow",
         "y sus aguas que dan al ladoga van cantando esta triste cancion, cancion triste de amor y de guerra cancion triste de guerra y amor.",
         "cuando ebrio ataca el enemigo y con vodka ataca sin valor rasga el aire mas fuerte que la metralla las estrofas de mi cara al sol.",
         "cara al sol cancion antigua y nueva cara al sol es el himno mejor cara al sol y morir peleando que mi patria asi me lo pidio.",
         "si en la lucha yo quedara roto marcharia en la legion de honor montaria en la guardia de los luceros",
		 "formaria junto al mejor montaria en la guardia de los luceros formaria junto al mejor"];
    return messages[Math.floor(Math.random()*messages.length)];
}

const contarChiste = (msg) =>{
    getChiste().then( chiste => {
        let username = msg.from.first_name || "";
        bot.sendMessage(msg.chat.id,"Escuchate este " + username + ":")
        .then(()=>{
            bot.sendMessage(msg.chat.id, chiste)
            .then(()=>{
                bot.sendMessage(msg.chat.id,"HAHAHAH " + getRandomMessage());
            });
        })
    }).catch(err => {
        console.log(err)
        bot.sendMessage(msg.chat.id, "CHABON ahora no tengo chistes :/");
    });
}

const letraMusica = (msg) =>{
	bot.sendMessage(msg.chat.id,"ESCUCHATE ESTA HAHAHA SOY ITALIANO " + getRandomLyrics());
};


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().includes("santo padre")) {
    bot.sendMessage(chatId, 'CHABON mi nombre es BERZERKER');
  }

  if (msg.text.toString().toLowerCase().includes("feliz cumple")) {
    let username = msg.from.first_name || "";
    bot.sendMessage(chatId, 'FELIZ CUMPLE '+ username + "NO TE COMAS MUCHOS PIBES HAHAHA");
  }

  if (msg.text.toString().toLowerCase().includes("bambino")) {
    bot.sendMessage(chatId, 'HAHAHA. Etzelente.');
  }

  if (msg.text.toString().toLowerCase().includes("pizza")) {
    bot.sendMessage(chatId, 'Quiero comer pitza HAHAHa.');
  }

  /*if (msg.text.toString().toLowerCase().includes("pini")) {
    bot.sendMessage(chatId, 'Che y si volvemos a WhatsApp?');
  }*/

  if (msg.text.toString().toLowerCase().includes("chiste")) {
    contarChiste(msg);
  }

  if (msg.text.toString().toLowerCase().includes("callate gordo")) {
    bot.sendMessage(chatId, 'NO SOY GORDO SOY PURO MACHO CHABON HAHAHA BAMBINO.');
  }

  if (msg.text.toString().toLowerCase().includes("nos juntamos")) {
    bot.sendMessage(chatId, 'LOS PASO A BUSCAR CON LA CUMBANCHA VIENE EL BILLY Y SU METRALLA HAHAHA');
  }

  if (msg.text.toString().toLowerCase().includes("compre")) {
    bot.sendMessage(chatId, 'CHABON YO TENGO UNO MEJOR EN MI CASA MAS GRANDE Y MAS LINDO');
  }
});

bot.on('new_chat_members', (msg) => {
    bot.sendMessage(msg.chat.id, "Bienvenide al grupo " + msg.chat.name + " estimadisime " + msg.new_chat_members.name);
});


bot.onText(/^\/humor/, function(msg, match){
    contarChiste(msg);
});

bot.onText(/^\/dia ([0-9]+) ([0-9]+)/, function(msg, match){
    if (match){
        if(match.length >= 3) {
            const dia = diainternacional.getDia(parseInt(match[1]), parseInt(match[2]));
            if (dia.length > 0)
                bot.sendMessage(msg.chat.id,dia, {parse_mode:"HTML"});
        }
    }
});

bot.onText(/^\/dia$/, function(msg, match){
    if (match){
        const dia = diainternacional.getHoy();
        if (dia.length > 0)
            bot.sendMessage(msg.chat.id,dia, {parse_mode:"HTML"});
    }
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
                comentario = "CHABON hoy vamos a tener un dia fresco\n\n"
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

bot.onText(/^\/musica/, function(msg, match){
    letraMusica(msg);
});
