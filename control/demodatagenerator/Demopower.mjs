import {Repository} from "../../model/database/power/Repository.mjs";
import {HlpClass} from "../../model/HlpClass.mjs";

export default class Demopower {
    repo;
    constructor() {
        this.repo = new Repository();
    }

    /**
     * Delete all PV Data from Today and the Future
     */
    deleteTodaysPowerData() {
        const data = this.repo.deleteTodaysPowerData();
        data.catch(console.error);
    }

    /**
     * Gets Power-Data from 31.05.2022 as Template and add it for Today
     */
    createDemoDataFromTemplatePowerDay() {
        let morningDate = new Date('2022-05-31 00:00');
        const now = new Date();
        let eveningDate = new Date('2022-05-31 24:00');
        const morningUnix = HlpClass.getUnixFromDate(morningDate);
        const eveningUnix = HlpClass.getUnixFromDate(eveningDate);

        let param = {"start": morningUnix, "end": eveningUnix};
        const data = this.repo.getPowerData(param);
        data.then((powerdata)=>{
            console.log('anzahl powerdata: '+powerdata.length)
            powerdata.forEach(entry => {
                let actualDate = new Date();
                // aendere datum zu heute
                let entryDate = HlpClass.getDateFromUnix(entry.tstamp);
                if(entryDate instanceof Date) {
                    actualDate.setHours(entryDate.getHours());
                    actualDate.setMinutes(entryDate.getMinutes());
                    actualDate.setSeconds(entryDate.getSeconds());
                    entry.tstamp = HlpClass.getUnixFromDate(actualDate);
                }
                this.repo.addPower(entry).catch((onerror)=>{ console.error(onerror); });
            })
        }).catch((onerror)=>{ console.error(onerror); });
    }
}