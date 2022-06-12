import {Repository} from "../../model/service/sbfspot/Repository.mjs";
import {HlpClass} from "../../model/HlpClass.mjs";

export default class Demosbfspot {
    repo;
    constructor() {
        this.repo = new Repository();
    }

    /**
     * Delete all PV Data from Today and the Future
     */
    deleteTodaysPVData() {
        const data = this.repo.deleteTodaysPvData();
        data.catch(console.error);
    }

    /**
     * Gets PV-Data from 26.05.2022 as Template and add it for Today
     */
    createDemoDataFromTemplatePVDay() {
        let morningDate = new Date('2022-05-26 04:00');
        const now = new Date();
        let eveningDate = new Date('2022-05-26 24:00');
        const morningUnix = HlpClass.getUnixFromDate(morningDate);
        const eveningUnix = HlpClass.getUnixFromDate(eveningDate);

        let param = {"start": morningUnix, "end": eveningUnix};
        const data = this.repo.getPvData(param);
        data.then((pvdata)=>{
            //console.log('anzahl pvdata: '+pvdata.length)
            pvdata.forEach(entry=>{
                let actualDate = new Date();
                // aendere datum zu heute
                let entryDate = HlpClass.getDateFromUnix(entry.timestamp);
                if(entryDate instanceof Date) {
                    actualDate.setHours(entryDate.getHours());
                    actualDate.setMinutes(entryDate.getMinutes());
                    actualDate.setSeconds(entryDate.getSeconds());
                    entry.timestamp = HlpClass.getUnixFromDate(actualDate);
                }
                this.repo.addPvDemoData(entry).catch((onerror)=>{ console.error(onerror); });
            })
        }).catch((onerror)=>{ console.error(onerror); });
    }
}