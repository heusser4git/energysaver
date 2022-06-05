import {Pvdata} from "../Pvdata.mjs";
import {Querygenerator} from "./Querygenerator.mjs";

export class PvdataQuery {
    constructor(table = "vwSpotData") {
        this.table = table;
    }

    sqlQuery(pvdata) {
        const query = new Querygenerator(this.table);
        if(pvdata instanceof Pvdata) {
            let params = []
            if(pvdata.getTimestamp()>0) {
                params.push(query.generateParams("TimeStamp", "=", pvdata.getTimestamp()));
            }
            if(params.length<1) {
                params.push(query.generateParams(1, "=", 1));
            }
            return query.generateFilterQuery(params);
        }
        return false;
    }
}