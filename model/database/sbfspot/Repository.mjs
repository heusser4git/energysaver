import Connection from '../Connection.mjs'
import {Pvdata} from "../../Pvdata.mjs";
import {PvdataQuery} from "../../query/PvdataQuery.mjs";
import {HlpClass} from "../../HlpClass.mjs";


export class Repository {
    connection;
    pool;

    constructor(file='dbSBFspot.json', path=null) {
        if(path != null) {
            this.connection = new Connection(file, path);
        } else {
            this.connection = new Connection(file);
        }
        this.pool = this.connection.pool();
    }

    getRawPvData(filter) {
        let query = '';
        if (filter instanceof Pvdata) {
            let queryData = new PvdataQuery().sqlQuery(filter);
            query = this.connection.mysql.format(queryData[0], queryData[1]);
        } else if(filter instanceof Object) {
            if(filter.start>10000 && filter.end>10000) {
                // from-to with timestamp
                let p = new Pvdata();
                let queryData = new PvdataQuery().sqlQuery(p);
                let sql = queryData[0] + " AND unix_timestamp(timestamp) >= " + filter.start + " AND unix_timestamp(timestamp) <= " + filter.end;
                let fields = queryData[1];
                query = this.connection.mysql.format(sql, fields);
                query = query + ' GROUP BY Nearest5min ORDER BY timestamp DESC';
            }
        }
        if(query.length>10) {
            return new Promise((resolve, reject)=>{
               this.connection.pool().query(query,  (error, elements)=>{
                    if(error){
                        return reject(error);
                    }
                    return resolve(elements);
                });
            });
        }
    }

    async getPvData(filter) {
        const rows = await this.getRawPvData(filter);
        let pvdatas = [];
        for(let entry of rows) {
            if(entry.PacTot>0)
                pvdatas.push(this.hlpSpotdataToPvdata(entry));
        }
        return pvdatas;
    }

    hlpSpotdataToPvdata(entry) {
        let p = new Pvdata();
        let date = new Date(entry.Nearest5min);
        p.setTimestamp(date.getTime()/1000);
        p.setNearest5min(entry.Nearest5min);
        p.setPower(entry.PacTot);
        p.setEfficiency(entry.Efficiency);
        p.setEnergy(entry.EToday);
        p.setEtotal(entry.ETotal);
        p.setTemperature(entry.Temperature);
        return p;
    }









    /*********************************************************************************************************************
     * DEMO-DATA-HANDLING
     */

    addPvDemoData(pvdata) {
        if(pvdata instanceof Pvdata) {
            let insertQuery = 'INSERT IGNORE INTO ?? (??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?);';
            let query = '';
            query += this.connection.mysql.format(insertQuery, ["spotdata", "TimeStamp", "Serial", "Pac1", "Pac2", "Pac3", "EToday", "ETotal", "Temperature",
                pvdata.timestamp, 1901372529, pvdata.power, 1, 1, pvdata.energy, pvdata.etotal, pvdata.temperature]);
            return new Promise((resolve, reject) => {
                this.pool.query(query, (error, response) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(response);
                });
            });
        }
    }

    deleteTodaysPvData() {
        let morningUnix = HlpClass.getUnixMorningAt(0);
        let query = 'delete from spotdata where timestamp >= ' + morningUnix;
        return new Promise((resolve, reject) => {
            this.pool.query(query, (error, response) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response);
            });
        });
    }
}


