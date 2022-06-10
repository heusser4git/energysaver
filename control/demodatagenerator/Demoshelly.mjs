import {Repository} from "../../model/database/power/Repository.mjs";
import {Power} from "../../model/Power.mjs";

export default class Demoshelly {
    repo;
    constructor() {
        this.repo = new Repository('dbPower.js', '../../model/secretdata/');
        this.run()
    }
    createDemoPower(power) {
        let promisePower = this.repo.addPower(power);
        promisePower.then((success)=>{
            console.log(success);
        }).catch((onerror)=>{
            console.error(onerror);
        });
    }

    calcDemoPower(lastpower) {
        let niveauPower;
        if(lastpower>0) {
            niveauPower = Number(((Number((Math.random()*10).toString().slice(0,1))*98.543)*100).toString().slice(2,5));
            return niveauPower + lastpower;
        }
        return (Number((Math.random()*10).toString().slice(0,1))*100).toString().slice();
    }

    run() {
        let date = new Date ();
        let now = Number.parseInt(Number(date.getTime()/1000));
        let param = {"start": (now-6000), "end": now};
        let powerdata = 0;
        const data = this.repo.getPowerData(param);
        data.then((success) => {
            console.log(success)
            if(success.length>0) {
                powerdata = success;
            }
        }).catch((onerror)=>{
            console.error(onerror);
        }).finally((data)=>{
            console.log(data)
        });
        while(true) {
            if(powerdata.length>0) {
                let newpower = this.calcDemoPower(powerdata.getPower());
                let power = new Power();
                power.setPower(newpower);
                const data = this.createDemoPower(power);
                console.log(data)
                break;
            }
        }
    }
}