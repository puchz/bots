// @ts-ignore
import * as Weather from 'weather-js';

interface CurrentWeather {
  temperature: string;
  skycode: string;
  skytext: string;
  date: string;
  observationtime: string;
  observationpoint: string;
  feelslike: string;
  humidity: string;
  winddisplay: string;
  day: string;
  shortday: string;
  windspeed: string;
  imageUrl: string;
}
interface ExtendedForecast {
  low: string;
  high: string;
  skycodeday: string;
  skytextday: string;
  day: string;
  shortday: string;
  precip: string;
}
export default class Forecast {
  currentWeather: CurrentWeather;
  extendedForecastList: ExtendedForecast[];

  options = {
    search: "Buenos Aires",
    degreeType: "C",
    lang: "es-ES",
  };

  current(): string {
    let msg: string;
    msg = this.commentAboutCurrent(+this.currentWeather.temperature);
    msg +=
      this.currentWeather.date +
      ":                <b>" +
      this.currentWeather.temperature +
      "°C " +
      this.convertToEmoji(this.currentWeather.skycode) +
      "</b>";
    msg +=
      "\n🥵 Termica: <b>" +
      this.currentWeather.feelslike +
      "°C</b>\n🌬️ Viento: <b>" +
      this.currentWeather.winddisplay +
      "</b>\n";
    msg += "💧 Humedad: <b>" + this.currentWeather.humidity + "%</b>\n";
    return msg;
  }

  extendedForecast(): string {
    let msg = "\n📅 Pronostico extendido: \n";
    this.extendedForecastList.forEach((element) => {
      let day = "<b>" + element.day + ":</b>";
      msg += day.padEnd(20);
      msg +=
        this.convertToEmoji(element.skycodeday) +
        "  Max: " +
        element.high +
        "°C  Min: " +
        element.low +
        "°C\n";
    });
    return msg;
  }

  convertToEmoji(skycodeday: string): string {
    let emoji: string;
    switch (skycodeday) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "17":
      case "35":
        //Thunderstorm
        emoji = "⛈️";
        break;
      case "11":
        // Light Rain
        emoji = "🌦️";
        break;
      case "12":
        // Rain
        emoji = "🌧️";
        break;
      case "31":
        // Clear night
        emoji = "🌤️";
        break;
      case "32":
        // Clear
        emoji = "🌞";
        break;
      case "36":
        // Hot
        emoji = "🌞";
        break;
      case "26":
        emoji = "🌥️";
        break;
      case "27":
      case "28":
      case "29":
      case "30":
      case "33":
      case "34":
        emoji = "🌤️";
        break;
      case "23":
      case "24":
        emoji = "🌬️";
        break;
      default:
        emoji = "🤪";
        break;
    }
    return emoji;
  }

  commentAboutCurrent(temperature: number): string {
    let comment: string;
    if (temperature <= 16) {
      comment = "CHABON hoy vamos a tener un dia fresco\n\n";
    } else if (temperature > 16 && temperature < 27) {
      comment = "CHABON hoy vamos a tener un dia calido\n\n";
    } else {
      comment = "Hoy va ser un dia muy caluroso. CHABON\n\n";
    }
    return comment;
  }

  async generateReport(): Promise<string> {
    let msg: string;
    await this.getForecast()
      .then((data) => {
        this.currentWeather = data.current;
        this.extendedForecastList = data.forecast;
      })
      .catch((error) => {
        console.log(error);
      });
    msg = this.current();
    msg += this.extendedForecast();

    return msg;
  }

  getForecast(): Promise<any> {
    let data;
    return new Promise((resolve, reject) => {
      Weather.find(this.options, function (error, response) {
        if (error) {
          reject(error);
        }
        if (response != undefined) {
          data = response[0];
        }
        resolve(data);
      });
    });
  }
}
