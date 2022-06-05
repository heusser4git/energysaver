import Connection from '../Connection.mjs'
import {Power} from "../../Power.mjs";
import {HlpClass} from "../../HlpClass.mjs";


export class Repository {
    connection;
    pool;
    constructor(file='dbPower.json', path=null) {
        if(path != null) {
            this.connection = new Connection(file, path);
        } else {
            this.connection = new Connection(file);
        }
        this.pool = this.connection.pool();
    }

    getRawPowerData(filter) {
        let query = '';
        // from-to with timestamp
        let sql = 'SELECT * FROM tblPower';
        if (filter instanceof Object && filter.start > 10000 && filter.end > 10000) {
            sql += ' where tstamp >= ' + filter.start + ' AND tstamp <= ' + filter.end;
        }
        query = sql + ' ORDER BY tstamp DESC';
        if (query.length > 10) {
            return new Promise((resolve, reject) => {
               this.pool.query(query, (error, elements) => {
                    if (error) {
                        return reject(error);
                    }
                   return resolve(elements);
                });
            });
        }
    }

    getRawPowerDataGrouped(filter, interval=5) {
        let query;
        let where = '';
        if (filter instanceof Object && filter.start > 10000 && filter.end > 10000) {
            where += ' where tstamp >= ' + filter.start + ' AND tstamp <= ' + filter.end;
        }
        let sql = "SELECT tstamp, mac, power, power1, pf1, current1, voltage1, isvalid1, total1, total_returned1, power2, pf2, current2, voltage2, isvalid2, total2, total_returned2, power3, pf3, current3, voltage3, isvalid3, total3, total_returned3, DATE_ADD('1000-01-01 00:00:00', Interval CEILING(TIMESTAMPDIFF(MINUTE, '1000-01-01 00:05:00', FROM_UNIXTIME(tstamp)) / " + interval +") * " + interval + " minute) AS tstamp_interval, AVG(power) as avgPower FROM tblPower " + where +" GROUP BY tstamp_interval";
        query = sql + ' ORDER BY tstamp DESC';
        if (query.length > 10) {
            return new Promise((resolve, reject) => {
                this.pool.query(query, (error, elements) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
            });
        }
    }

    async getPowerDataGrouped(filter, interval=5) {
        const rows = await this.getRawPowerDataGrouped(filter, interval);
        let powerdatas = [];
        for (let entry of rows) {
            powerdatas.push(this.hlpSpotdataToPvdata(entry));
        }
        return powerdatas;
    }

    async getPowerData(filter) {
        const rows = await this.getRawPowerData(filter);
        let powerdatas = [];
        for (let entry of rows) {
            powerdatas.push(this.hlpDbdataToPowerdata(entry));
        }
        return powerdatas;
    }

    hlpDbdataToPowerdata(entry) {
        let power = new Power();
        power.setTstamp(entry.tstamp);
        power.setMac(entry.mac);
        power.setPower(entry.power);

        let phase1 = new Power();
        phase1.setPower(entry.power1);
        phase1.setPowerfactor(entry.pf1);
        phase1.setCurrent(entry.current1);
        phase1.setVoltage(entry.voltage1);
        phase1.setIsvalid(entry.isvalid1);
        phase1.setTotal(entry.total1);
        phase1.setTotalreturned(entry.tota_returned1);
        power.addPhase(phase1);

        let phase2 = new Power();
        phase2.setPower(entry.power2);
        phase2.setPowerfactor(entry.pf2);
        phase2.setCurrent(entry.current2);
        phase2.setVoltage(entry.voltage2);
        phase2.setIsvalid(entry.isvalid2);
        phase2.setTotal(entry.total2);
        phase2.setTotalreturned(entry.tota_returned2);
        power.addPhase(phase2);

        let phase3 = new Power();
        phase3.setPower(entry.power3);
        phase3.setPowerfactor(entry.pf3);
        phase3.setCurrent(entry.current3);
        phase3.setVoltage(entry.voltage3);
        phase3.setIsvalid(entry.isvalid3);
        phase3.setTotal(entry.total3);
        phase3.setTotalreturned(entry.tota_returned3);
        power.addPhase(phase3);

        return power;
    }

    addPower(power) {
        if(power instanceof Power) {
            let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            const [phase1, phase2, phase3] = power.getPhases();
            let query = this.connection.mysql.format(insertQuery, ["tblPower", "tstamp", "mac","power", "power1", "pf1", "current1", "voltage1", "isvalid1", "total1", "total_returned1", "power2", "pf2", "current2", "voltage2", "isvalid2", "total2", "total_returned2", "power3", "pf3", "current3", "voltage3", "isvalid3", "total3", "total_returned3",
                power.getTstamp(), power.getMac(), power.getPower(), phase1.getPower(), phase1.getPowerfactor(), phase1.getCurrent(), phase1.getVoltage(), phase1.getIsvalid(), phase1.getTotal(), phase1.getTotalreturned(), phase2.getPower(), phase2.getPowerfactor(), phase2.getCurrent(), phase2.getVoltage(), phase2.getIsvalid(), phase2.getTotal(), phase2.getTotalreturned(), phase3.getPower(), phase3.getPowerfactor(), phase3.getCurrent(), phase3.getVoltage(), phase3.getIsvalid(), phase3.getTotal(), phase3.getTotalreturned()]);
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

    deleteTodaysPowerData() {
        let morningUnix = HlpClass.getUnixMorningAt(0);
        let query = 'delete from tblPower where tstamp >= ' + morningUnix;
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

