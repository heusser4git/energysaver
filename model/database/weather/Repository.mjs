import Connection from '../Connection.mjs'
import {WeatherForecastHourlyQuery} from "../../query/WeatherForecastHourlyQuery.mjs";
import {Weather} from "../../Weather.mjs";


const connection = new Connection('dbWeather.json');

export default class Repository {
    getRawWeather(filter, type="daily") {
        let query = '';
        let deleted = ' AND deleted != 1';
        if (filter instanceof Weather) {
            filter.setType(type);
            let queryData = new WeatherForecastHourlyQuery().sqlQuery(filter);
            query = connection.mysql.format(queryData[0] + deleted, queryData[1]);
        } else if(filter instanceof Object) {
            if(filter.start>10000 && filter.end>10000) {
                // from to with timestamp
                let w = new Weather();
                let queryData = new WeatherForecastHourlyQuery().sqlQuery(w);
                let sqlType = '';
                if(type.length>0) {
                    sqlType = " AND type = '" + type + "'";
                }
                let sql = queryData[0] + sqlType + " AND timestamp >= " + filter.start + " AND timestamp <= " + filter.end + deleted;
                let fields = queryData[1];
                query = connection.mysql.format(sql, fields);
            }
        }
        query += ' ORDER BY timestamp';
        if(query.length>25) {
            return new Promise((resolve, reject) => {
                connection.pool().query(query, (error, elements) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
            });
        }
        return '';
    }

    async getWeather(filter, type) {
        const dbrows = await this.getRawWeather(filter, type);
        let weathers = [];
        for(let entry of dbrows) {
            weathers.push(this.hlpDBToWeather(entry));
        }
        console.log('getWeather gefunden: ' + weathers.length);
        return weathers;
    }

    hlpDBToWeather(entry) {
        let w = new Weather();
        w.setId(entry.id);
        w.setTimestamp(entry.timestamp);
        w.setLatitude(entry.latitude);
        w.setLongtitude(entry.longtitude);
        w.setTemperatur(entry.temperatur);
        w.setClouds(entry.clouds);
        w.setUvi(entry.uv);
        w.setVisibility(entry.visibility);
        w.setMain(entry.weather_main);
        w.setDescription(entry.weather_description);
        w.setIcon(entry.weather_icon);
        w.setSunrise(entry.sunrise);
        w.setSunset(entry.sunset);
        w.setMoonset(entry.moonset);
        w.setMoonphase(entry.moon_phase);
        w.setPressure(entry.pressure);
        w.setHumidity(entry.humidity);
        w.setDewpoint(entry.dew_point);
        w.setWindspeed(entry.wind_speed);
        w.setWinddeg(entry.wind_deg);
        w.setWindgust(entry.wind_gust);
        w.setClouds(entry.clouds);
        w.setPop(entry.pop);
        w.setRain(entry.rain);
        w.setUvi(entry.uvi);
        w.setTempday(entry.temp_day);
        w.setTempmin(entry.temp_min);
        w.setTempmax(entry.temp_max);
        w.setTempnight(entry.temp_night);
        w.setTempeve(entry.temp_eve);
        w.setTempmorn(entry.temp_morn);
        return w;
    }

    /**
     * Adds an HourlyForecast to the Database
     * @param weather   Wheater-Object with Data to create in database
     * @returns number  Autoincrement ID from Database
     */
    addWeather(weather) {
        if(weather instanceof Weather) {
            let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            let query = connection.mysql.format(insertQuery, ["tblWetter", "type", "timestamp","latitude", "longtitude", "temperatur", "clouds", "uvi", "visibility", "weather_main", "weather_description", "weather_icon", "sunrise", "sunset", "moonset", "moon_phase", "pressure", "humidity", "dew_point", "wind_speed", "wind_deg", "wind_gust", "rain", "temp_day", "temp_min", "temp_max", "temp_night", "temp_eve", "temp_morn",
                weather.getType(), weather.getTimestamp(), weather.getLongtitude(), weather.getLatitude(), weather.getTemperatur(), weather.getClouds(), weather.getUvi(), weather.getVisibility(), weather.getMain(), weather.getDescription(), weather.getIcon(), weather.getSunrise(), weather.getSunset(), weather.getMoonset(), weather.getMoonphase(), weather.getPressure(), weather.getHumidity(), weather.getDewpoint(), weather.getWindspeed(), weather.getWinddeg(), weather.getWindgust(), weather.getRain(), weather.getTempday(), weather.getTempmin(), weather.getTempmax(), weather.getTempnight(), weather.getTempeve(), weather.getTempmorn()]);

            return new Promise((resolve, reject) => {
                connection.pool().query(query, (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('addWeather inserted: '+response.insertId);
                    return resolve(response.insertId);
                });
            });
        }
    }

    /**
     * Marks a Forecast as deleted
     * @param unixtimestamps  Array of Timestamps which should by deleted
     * @returns number Number of changed rows
     */
    deleteWeatherByTimestamp(unixtimestamps) {
        if (unixtimestamps.length > 0) {
            let unixtimestampIn = '(' + unixtimestamps.join(',') + ')';
            let insertQuery = 'UPDATE ?? set deleted=1 WHERE ?? IN ? and deleted!=1';
            let query = connection.mysql.format(insertQuery, ["tblWetter", "timestamp", unixtimestampIn]);
            // TODO ' vor IN
            query = "UPDATE `tblWetter` set deleted=1 WHERE `timestamp` IN " + unixtimestampIn + " and deleted!=1";

            return new Promise((resolve, reject) => {
                connection.pool().query(query, (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(response.message);
                    return resolve(response.changedRows);
                });
            });
        }
    }
}


