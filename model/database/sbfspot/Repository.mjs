import Connection from '../Connection.mjs'
import {Pvdata} from "../../Pvdata.mjs";
import {PvdataQuery} from "../../query/PvdataQuery.mjs";
import {Power} from "../../Power.mjs";


export class Repository {
    connection;
    pool;

    constructor(file, path='') {
        this.connection = new Connection('dbSBFspot.json', path);
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
                query = query + ' ORDER BY timestamp DESC';
            }
        }
        console.log(query)
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
    hlpUnixToDbDate(unix) {
        let date = new Date(unix * 1000);
        // TODO remove console.log
        console.log(date)
        return new Date(unix * 1000).toISOString().slice(0, 19).replace('T', ' ');
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
        let date = new Date(entry.TimeStamp);
        p.setTimestamp(date.getTime()/1000);
        p.setPower(entry.PacTot);
        p.setEfficiency(entry.Efficiency);
        p.setEnergy(entry.EToday);
        p.setEtotal(entry.ETotal);
        p.setTemperature(entry.Temperature);
        return p;
    }

    /**
     * Deletes all Data from PVdata
     * @returns {Promise<unknown>}
     */
    clearPvData() {
        return new Promise((resolve, reject) => {
            this.pool.query('truncate spotdata', (error, response) => {
                if (error) {
                    return reject(error);
                }
                console.log('clearPvData: ' + response.affectedRows)
                return resolve(response);
            });
        });
    }

    addPvDemoData(unix) {
        if(!Array.isArray(unix)) {
            unix = [unix];
        }
        let insertQuery = 'INSERT IGNORE INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
        let query = '';
        for (let timestamp of unix) {
            if (timestamp != null && timestamp > 0)
                query += this.connection.mysql.format(insertQuery, ["spotdata", "TimeStamp", "Serial", "Pdc1", "Pdc2", "Idc1", "Idc2", "Udc1", "Udc2", "Pac1", "Pac2", "Pac3", "Iac1", "Iac2", "Iac3", "Uac1", "Uac2", "Uac3", "EToday", "ETotal", "Frequency", "OperatingTime", "FeedInTime",
                    timestamp, 1901372529, this.hlpGetRandNum(4), this.hlpGetRandNum(4), this.hlpGetRandNum(1, 3), this.hlpGetRandNum(1, 3), this.hlpGetRandNum(3, 2), this.hlpGetRandNum(3, 2), this.hlpGetRandNum(4), this.hlpGetRandNum(4), this.hlpGetRandNum(4), this.hlpGetRandNum(1, 3), this.hlpGetRandNum(1, 3), this.hlpGetRandNum(1, 3), this.hlpGetRandNum(3, 2), this.hlpGetRandNum(3, 2), this.hlpGetRandNum(3, 2), this.hlpGetRandNum(5), this.hlpGetRandNum(8), 50, this.hlpGetRandNum(5, 1), this.hlpGetRandNum(4, 2)]);
        }
        return new Promise((resolve, reject) => {
            this.pool.query(query, (error, response) => {
                if (error) {
                    return reject(error);
                }
                console.log('addPvDemoData: ' + response.affectedRows)
                return resolve(response);
            });
        });
    }

    createPVDemoDataForTodayTillNow() {
        this.clearPvData().then((success)=>{
            let now = new Date();
            const nowUnix = now.getTime()/1000;
            // unix in the morning at 6:00
            now.setHours(6);
            now.setMinutes(0);
            now.setSeconds(0);
            let unix = now.getTime()/1000;
            let unixArray = [];
            while (unix < nowUnix) {
                unix += 300;
                unixArray.push(unix);
                this.addPvDemoData(unix);
            }
        }).catch((onerror)=>{
            console.error(onerror);
        })
    }

    hlpGetRandNum(vorkommastellen=2, nachkommastellen=0) {
        const vFaktor = Math.pow(10, vorkommastellen);
        const vorkomma = Number(Math.random().toString().slice(0, (2+vorkommastellen)))*vFaktor;
        const nachkomma = Number(Math.random().toString().slice(2, 2+nachkommastellen));
        if(!isNaN(Number(vorkomma + '.' + nachkomma) )) {
            return Number(vorkomma + '.' + nachkomma);
        } else {
            return this.hlpGetRandNum(vorkommastellen, nachkommastellen);
        }
    }
}


