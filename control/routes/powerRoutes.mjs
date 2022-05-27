import express from 'express';
import {Repository} from "../../model/database/power/Repository.mjs";
import {HlpClass} from "../../model/HlpClass.mjs";
const Router = express.Router();

const repo = new Repository();


// http://localhost:<port>/power/1652554800-1652558400
Router.get("/:start-:end", (req, res)=>{
    let param = {"start": req.params.start, "end": req.params.end};
    const data = repo.getPowerData(param);
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.log(failure);
    });
});

// http://localhost:<port>/power/
export default Router.get("/", (req, res)=>{
    console.log("route /");
    const data = repo.getPowerData({});
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.log(failure);
    });
});

// http://localhost:<port>/power/current
Router.get("/current", (req, res)=>{
    const nowUnix = HlpClass.getUnixNow();
    let param = {"start": (nowUnix-300), "end": nowUnix};
    const data = repo.getPowerData(param);
    data.then((success) => {
        if(success.length>0) {
            res.send(success[0]);
        } else {
            res.send({});
        }
    }).catch((onerror)=>{
        console.error(onerror);
    });
});

Router.get("/today", (req, res)=>{
    const nowUnix = HlpClass.getUnixNow();
    // unix in the morning at 6:00
    const unixMorning = HlpClass.getUnixMorningAt(0);

    let param = {"start": (unixMorning), "end": nowUnix};
    const data = repo.getRawPowerDataGrouped(param);
    data.then((powerdata) => {
        res.send(powerdata);
    }).catch((onerror)=>{
        console.error(onerror);
    });
});
