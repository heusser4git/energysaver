import express from 'express';
import {Pvdata} from "../../model/Pvdata.mjs";
import Repository from "../../model/database/sbfspot/Repository.mjs";
const Router = express.Router();

const pvRepo = new Repository();

/**
 * Zeitslot
 * gibt alle PV-Eintraege waehrend einer definierten Periode aus
 *
 * http://localhost:<port>/pvData/1652554800-1652558400
 */
Router.get("/:start-:end", (req, res)=>{
    let param = {"start": req.params.start, "end": req.params.end};
    const data = pvRepo.getPvData(param);
    data.then((pvdata) => {
        res.send(pvdata);
    }).catch((onerror)=>{
        console.error(onerror);
    });
});

/**
 * pvData gibt alle PV-Eintraege aus
 *
 * http://localhost:<port>/pvData/
 */
export default Router.get("/", (req, res)=>{
    const data = pvRepo.getPvData(new Pvdata());
    data.then((pvdata) => {
        res.send(pvdata);
    }).catch((onerror)=>{
        console.error(onerror);
    });
});

/**
 * CURRENT
 * holt den aktuellsten PV-Eintrag bis max. 5min zurueck
 * oder gibt ein leeres Objekt aus
 *
 * http://localhost:<port>/pvData/current
 */
Router.get("/current", (req, res)=>{
    let date = new Date ();
    let timezonediff = -date.getTimezoneOffset()*60;
    let now = (date.getTime()/1000)+timezonediff;
    // TODO naechste Zeile ist ein Testtimestamp... muss entfernt werden
    now = 1652107035;

    let param = {"start": (now-300), "end": now};
    const data = pvRepo.getPvData(param);
    data.then((pvdata) => {
        if(pvdata.length>0) {
            res.send(pvdata[0]);
        } else {
            res.send(new Pvdata());
        }
    }).catch((onerror)=>{
        console.error(onerror);
    });
});