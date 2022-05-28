import * as assert from "assert";
import {Pvdata} from "../model/Pvdata.mjs";
import {PvdataQuery} from "../model/query/PvdataQuery.mjs";
describe("PvdataQuery", function (){
    describe("Test1: sqlQuery: Get a specific sql-query for pvData", function (){
        let pvDataQuery = new PvdataQuery();
        let pvData = new Pvdata();
        pvData.setTimestamp(1653723210);
        let query = pvDataQuery.sqlQuery(pvData);

        assert.strictEqual(query[0], 'SELECT * FROM vwspotdata WHERE TimeStamp = ?');
        assert.strictEqual(query[1][0], 1653723210);
    });
    describe("Test2: sqlQuery: Get a specific sql-query for pvData", function (){
        let pvDataQuery = new PvdataQuery();
        let pvData = new Pvdata();
        let query = pvDataQuery.sqlQuery(pvData);

        assert.strictEqual(query[0], 'SELECT * FROM vwspotdata WHERE 1 = ?');
        assert.strictEqual(query[1][0], 1);
    });
    describe("Test3: sqlQuery: Get a specific sql-query for pvData", function (){
        let pvDataQuery = new PvdataQuery('spotdata');
        let pvData = new Pvdata();
        let query = pvDataQuery.sqlQuery(pvData);

        assert.strictEqual(query[0], 'SELECT * FROM spotdata WHERE 1 = ?');
        assert.strictEqual(query[1][0], 1);
    });
});