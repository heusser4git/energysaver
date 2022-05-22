import Connection from '../Connection.mjs'
import {Pvdata} from "../../Pvdata.mjs";
import {PvdataQuery} from "../../query/PvdataQuery.mjs";


const connection = new Connection('dbSBFspot.json');

export default class Repository {
    getRawPvData(filter) {
        let query = '';
        if (filter instanceof Pvdata) {
            let queryData = new PvdataQuery().sqlQuery(filter);
            query = connection.mysql.format(queryData[0], queryData[1]);
        } else if(filter instanceof Object) {
            if(filter.start>10000 && filter.end>10000) {
                // from-to with timestamp
                let p = new Pvdata();
                let queryData = new PvdataQuery().sqlQuery(p);
                let sql = queryData[0] + " AND unix_timestamp(timestamp) >= " + filter.start + " AND unix_timestamp(timestamp) <= " + filter.end;
                let fields = queryData[1];
                query = connection.mysql.format(sql, fields);
                query = query + ' ORDER BY timestamp DESC';
            }
        }
        console.log(query)
        if(query.length>10) {
            return new Promise((resolve, reject)=>{
                connection.pool().query(query,  (error, elements)=>{
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
}


