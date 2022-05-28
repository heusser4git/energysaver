import * as assert from "assert";
import {Weather} from "../model/Weather.mjs";
import {WeatherForecastHourlyQuery} from "../model/query/WeatherForecastHourlyQuery.mjs";
describe("WeatherForecastHourlyQuery", function (){
    describe("Test1: sqlQuery: Get a specific sql-query for Weather", function (){
        let weatherQuery = new WeatherForecastHourlyQuery();
        let weather = new Weather();
        weather.setId(2837)
        let query = weatherQuery.sqlQuery(weather);

        assert.strictEqual(query[0], 'SELECT * FROM tblWetter WHERE id = ?');
        assert.strictEqual(query[1][0], 2837);
    });
    describe("Test2: sqlQuery: Get a specific sql-query for Weather", function (){
        let weatherQuery = new WeatherForecastHourlyQuery();
        let weather = new Weather();
        weather.setType('daily')
        let query = weatherQuery.sqlQuery(weather);

        assert.strictEqual(query[0], 'SELECT * FROM tblWetter WHERE type LIKE ?');
        assert.strictEqual(query[1][0], 'daily');
    });
    describe("Test3: sqlQuery: Get a specific sql-query for Weather", function (){
        let weatherQuery = new WeatherForecastHourlyQuery();
        let weather = new Weather();
        weather.setTimestamp(1653723210)
        let query = weatherQuery.sqlQuery(weather);

        assert.strictEqual(query[0], 'SELECT * FROM tblWetter WHERE timestamp = ?');
        assert.strictEqual(query[1][0], 1653723210);
    });
    describe("Test3: sqlQuery: Get a specific sql-query for Weather", function (){
        let weatherQuery = new WeatherForecastHourlyQuery();
        let weather = new Weather();
        weather.setLongitude(54.323)
        let query = weatherQuery.sqlQuery(weather);

        assert.strictEqual(query[0], 'SELECT * FROM tblWetter WHERE longitude LIKE ?');
        assert.equal(query[1][0], 54.323);
    });
    describe("Test3: sqlQuery: Get a specific sql-query for Weather", function (){
        let weatherQuery = new WeatherForecastHourlyQuery();
        let weather = new Weather();
        weather.setLatitude(54.323)
        let query = weatherQuery.sqlQuery(weather);

        assert.strictEqual(query[0], 'SELECT * FROM tblWetter WHERE latitude LIKE ?');
        assert.equal(query[1][0], 54.323);
    });
    describe("Test3: sqlQuery: Get a specific sql-query for Weather", function (){
        let weatherQuery = new WeatherForecastHourlyQuery();
        let weather = new Weather();
        let query = weatherQuery.sqlQuery(weather);

        assert.strictEqual(query[0], 'SELECT * FROM tblWetter WHERE 1 = ?');
        assert.equal(query[1][0], 1);
    });
});