import express from 'express';
import {Pvdata} from "../../model/Pvdata.mjs";
import {Repository} from "../../model/database/sbfspot/Repository.mjs";
import {HlpClass} from "../../model/HlpClass.mjs";
const Router = express.Router();

const pvRepo = new Repository();

/**
 * Zeitslot
 * gibt alle PV-Eintraege waehrend einer definierten Periode aus
 *
 * http://localhost:<port>/pvData/1652554800-1652558400
 */
Router.get("/:start-:end", (req, res)=>{
    if(!isNaN(req.params.start) && !isNaN(req.params.end)) {
        let param = {"start": req.params.start, "end": req.params.end};
        const data = pvRepo.getPvData(param);
        data.then((pvdata) => {
            res.send(pvdata);
        }).catch((onerror) => {
            console.error(onerror);
        });
    } else {
        res.sendStatus(405);
    }
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
    const nowUnix = HlpClass.getUnixNow();
    let param = {"start": (nowUnix-300), "end": nowUnix};
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

/**
 * TODAY
 *
 * http://localhost:<port>/pvData/today
 */
Router.get("/today", (req, res)=>{
    const nowUnix = HlpClass.getUnixNow();
    // unix in the morning at 6:00
    const unixMorning = HlpClass.getUnixMorningAt(0);
    let param = {"start": unixMorning, "end": nowUnix};
    const data = pvRepo.getPvData(param);
    data.then((pvdata) => {
        res.send(pvdata);
    }).catch((onerror)=>{
        console.error(onerror);
    });
});