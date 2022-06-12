/**
 * Dieses Script holt die Wetterdaten von openweathermap.org und schreibt es in die Datenbank wetter.tblWetter
 */

import https from 'https';

import Repository from "../service/weather/Repository.mjs";
import {Weather} from "../Weather.mjs";
import fs from "fs";

export class Openweathermap {
    repository;
    apikey;
    apikeyParam;

    lat = 46.9821456;
    lon = 9.5761204;
    part = "current,minutely,alerts";
    url;

    constructor() {
        this.hlpGetSecretData();

        this.repository = new Repository();
        this.apikeyParam = "&appid=" + this.apikey;
        this.url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&exclude=${this.part}` + this.apikeyParam;
    }

    hlpGetSecretData(secretfile='openweather.json', path='./model/secretdata/') {
        try {
            const data = fs.readFileSync(path+secretfile, 'utf-8');
            const obj = JSON.parse(data);
            this.apikey = obj.apikey;
            this.lat = obj.latitude;
            this.lon = obj.longitude;
        } catch(error) {
            console.error(error);
        }
    }

    run() {
        const request = https.get(this.url, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                res.resume();
                return;
            }

            let data = '';
            const promiseData = new Promise((resolve, reject) => {
                /*
                 * get Data out of the http-Request
                 */
                res.on('close', () => {
                    const obj = JSON.parse(data);
                    resolve(obj);
                })
            }).then((obj) => {
                /*
                 * Move JSON-Data into Objects
                 */
                let weathers = [];
                /*
                    Daily-Weather Forecast
                 */
                for (let entry of obj.daily) {
                    let weather = new Weather();
                    weather.setType('daily');
                    weather.setTimestamp(entry.dt);
                    weather.setLatitude(obj.lat);
                    weather.setLongitude(obj.lon);
                    weather.setSunrise(entry.sunrise);
                    weather.setSunset(entry.sunset);
                    weather.setMoonset(entry.moonset);
                    weather.setMoonphase(entry.moonphase);
                    let t = entry.temp;
                    weather.setTempday(t.day);
                    weather.setTempmin(t.min);
                    weather.setTempmax(t.max);
                    weather.setTempnight(t.night);
                    weather.setTempeve(t.eve);
                    weather.setTempmorn(t.morn);
                    weather.setPressure(entry.pressure);
                    weather.setHumidity(entry.humidity);
                    weather.setDewpoint(entry.dewpoint);
                    weather.setWindspeed(entry.windspeed);
                    weather.setWinddeg(entry.winddeg);
                    weather.setWindgust(entry.windgust);
                    weather.setClouds(entry.clouds);
                    weather.setPop(entry.pop);
                    weather.setRain(entry.rain);
                    weather.setUvi(entry.uvi);
                    let w = entry.weather[0];
                    weather.setMain(w.main);
                    weather.setDescription(w.description);
                    weather.setIcon(w.icon);    // https://openweathermap.org/weather-conditions#How-to-get-icon-URL

                    weathers.push(weather);
                }
                /*
                    Hourly-Weather Forecast
                 */
                for (let entry of obj.hourly) {
                    let weather = new Weather();
                    weather.setType('hourly');
                    weather.setTimestamp(entry.dt);
                    weather.setLatitude(obj.lat);
                    weather.setLongitude(obj.lon);
                    weather.setTemperatur(entry.temp);
                    weather.setClouds(entry.clouds);
                    weather.setUvi(entry.uvi);
                    weather.setVisibility(entry.visibility);
                    let w = entry.weather[0];
                    weather.setMain(w.main);
                    weather.setDescription(w.description);
                    weather.setIcon(w.icon);

                    weathers.push(weather);
                }
                return weathers;
            }).then((weathers) => {
                /*
                 * Delete old Weather-Data from Database
                 */
                let timestamps = [];
                for (let weather of weathers) {
                    timestamps.push(weather.getTimestamp());
                }
                let dbresult = this.repository.deleteWeatherByTimestamp(timestamps);
                return dbresult.then(() => {
                    return weathers;
                }).then(null, (error) => {
                    console.error(error);
                    return [];
                })
            }).then((weathers) => {
                /*
                 * Write new Weatherdata into Database
                 */
                let newIds = [];
                for (let weather of weathers) {
                    this.repository.addWeather(weather, (newId) => {
                        newIds.push(newId);
                    }).catch((error)=> {
                        console.error(error);
                    });
                }
            }).catch((error) => {
                console.error(error)
            });

            res.on('data', (chunk) => {
                data += chunk;
            });
        });
    }
}