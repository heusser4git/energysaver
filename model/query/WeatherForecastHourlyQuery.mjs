import {Weather} from "../Weather.mjs";
import {Querygenerator} from "./Querygenerator.mjs";

export class WeatherForecastHourlyQuery {
    constructor(table = "tblWetter") {
        this.table = table;
    }
    sqlQuery(weather) {
        const query = new Querygenerator(this.table);
        if(weather instanceof Weather) {
            let params = []
            if(weather.getId()>0) {
                params.push(query.generateParams("id", "=", weather.getId()));
            }
            if(weather.getType() != undefined && weather.getType().length>0) {
                // like
                params.push(query.generateParams("type", "_", weather.getType()));
            }
            if(weather.getTimestamp()>0) {
                params.push(query.generateParams("timestamp", "=", weather.getTimestamp()));
            }
            if(weather.getLongitude()>0) {
                params.push(query.generateParams("longitude", "_", weather.getLongitude()));
            }
            if(weather.getLatitude()>0) {
                params.push(query.generateParams("latitude", "_", weather.getLatitude()));
            }
            if(params.length<1) {
                params.push(query.generateParams(1, "=", 1));
            }
            return query.generateFilterQuery(params);
        }
        return false;
    }

}