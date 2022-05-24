import axios from 'axios';
import {Power} from "../Power.mjs";
import {Repository} from "../database/power/Repository.mjs";

export default class Shelly{
    protocol;
    ip;
    port;
    url;
    repo;

    constructor() {
        this.protocol = 'http';
        this.ip = "192.168.1.3";
        this.port = 80;
        this.url = this.protocol + "://" + this.ip + ":" + this.port + "/status";

        this.repo = new Repository();
    }

    run() {
        let json;
        axios.get(this.url)
            .then((response) => {
                // handle success
                json = response.data;
                let power = new Power();
                power.setTstamp(json.unixtime);
                power.setMac(json.mac);
                power.setPower(json.total_power);
                for (let i = 0; i < json.emeters.length; i++) {
                    let emeter = json.emeters[i];
                    let phase = new Power();
                    phase.setPower(emeter.power);
                    phase.setPowerfactor(emeter.pf);
                    phase.setCurrent(emeter.current);
                    phase.setVoltage(emeter.voltage);
                    phase.setIsvalid(emeter.is_valid);
                    phase.setTotal(emeter.total);
                    phase.setTotalreturned(emeter.total_returned);
                    power.addPhase(phase);
                }

                // write power into the db
                const promise = this.repo.addPower(power);
                promise.then((success)=>{
                    console.log('Count of inserted Power: ' + success.affectedRows);
                }).catch((onerror)=>{
                    console.error(onerror);
                })
            })
            .catch((error) => {
                // handle error
                console.log(error + json);
            })
    }
}
