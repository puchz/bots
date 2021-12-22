let dias = [];

const DAYS_DB_PATH = process.env.DB_DIAS_PATH || "./dias-db.json"; 

try {
    dias = require(DAYS_DB_PATH);
} catch (e) {
    console.error("No se encontro la base de datos de días", e);
}

dias = dias.map( r => {
    r.date = new Date(r.date);
    r.day = r.date.getDate();
    r.month = r.date.getMonth()+1;
    r.year = r.date.getFullYear();
    return r;
});

const getForDayAndMonth = function(dia,mes) {
    const res = dias.filter( d => {
	return (d.day == dia && d.month == mes);
    })
    return res;
};

function getCurrentDate(){
    const args = process.argv.slice(2);
    if (args == null) return null;
    const day = parseInt(args[0]);
    const month = parseInt(args[1]); 
    if ( isNaN(day) || isNaN(month) )
	return null;
    return {day:day, month:month};
}

function isMes(n){
    return (!isNaN(n) && (n<=12) && (n>0));
}

function isDia(n){
    return (!isNaN(n) && (n<=31) && (n>0));
}

const meses = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre"
};


const nameFilter = (fromString) => { return fromString.match(/(.*)(<.*$)/)[1].trim()};

const getDiaInternacional = (dia, mes) => {

    let msg =  "No entiendo esa fecha CHABON";
    
    // manejar casos invalidos para dia y mes
    if (!(isMes(mes) && isDia(dia))){
	return msg;
    }
    
    resultados = getForDayAndMonth(dia,mes); 
    
    if (resultados.length == 0) {
	msg = "Ese día no lo tengo CHABON... te la debo 😞.";
    }

    if (resultados.length == 1) {
	msg =   "📰 HOY ES " + dia + " DE " + meses[mes].toUpperCase() + " " +  
		resultados[0].subject + 
		".\n__Decretado por " + 
		nameFilter(resultados[0].from) +
		" en el año " +
		resultados[0].year +  "__";
    }

    if (resultados.length > 1){
    	msg = "CHABON. HOY ES " + dia + " DE " + meses[mes].toUpperCase() + ". Según mis registros se celebran:";
	resultados.forEach( r => {
	    msg += ("\n📅 " + r.subject + ". __Decretado por " + nameFilter(r.from) +  " en el año " + r.year +"__");
        });
    }
    return msg;
}

const getDiaInternacionalHoy = () => {
	const hoy = new Date();
	const dia = hoy.getDate();
	const mes = hoy.getMonth()+1;
	return getDiaInternacional(dia,mes);
} 

module.exports = {
    getDia : getDiaInternacional,
    getHoy : getDiaInternacionalHoy
};
