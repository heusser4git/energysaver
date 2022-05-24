import Connection from '../Connection.mjs'
import {Power} from "../../Power.mjs";


export class Repository {
    connection;
    pool;
    constructor(file='dbPower.json', path='') {
        this.connection = new Connection(file, path);
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
        console.log(query)

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
                        console.log('ERROR hier')
                        return reject(error);
                    }
                    console.log('addPower: ' + response.affectedRows)
                    return resolve(response);
                });
            });
        }
    }

    createDemoPower(unix) {
        let power = new Power();
        power.setTstamp(unix);
        power.setMac('BCFF4DFD1C7C');
        power.setPower(this.hlpGetRandNum(4));

        let phase1 = new Power();
        phase1.setPower(this.hlpGetRandNum(4));
        phase1.setPowerfactor(this.hlpGetRandNum(0,2));
        phase1.setCurrent(this.hlpGetRandNum(1,2));
        phase1.setVoltage(238);
        phase1.setIsvalid(1);
        phase1.setTotal(this.hlpGetRandNum(5));
        phase1.setTotalreturned(this.hlpGetRandNum(6));
        power.addPhase(phase1);

        let phase2 = new Power();
        phase2.setPower(this.hlpGetRandNum(4));
        phase2.setPowerfactor(this.hlpGetRandNum(0,2));
        phase2.setCurrent(this.hlpGetRandNum(1,2));
        phase2.setVoltage(238);
        phase2.setIsvalid(1);
        phase2.setTotal(this.hlpGetRandNum(5));
        phase2.setTotalreturned(this.hlpGetRandNum(6));
        power.addPhase(phase2);

        let phase3 = new Power();
        phase3.setPower(this.hlpGetRandNum(4));
        phase3.setPowerfactor(this.hlpGetRandNum(0,2));
        phase3.setCurrent(this.hlpGetRandNum(1,2));
        phase3.setVoltage(238);
        phase3.setIsvalid(1);
        phase3.setTotal(this.hlpGetRandNum(5));
        phase3.setTotalreturned(this.hlpGetRandNum(6));
        power.addPhase(phase3);

        return this.addPower(power).then((success)=>{ }).catch((onerror)=>{console.error(onerror);});
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

