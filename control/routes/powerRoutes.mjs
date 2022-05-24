import express from 'express';
import {Repository} from "../../model/database/power/Repository.mjs";
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
    let date = new Date ();
    // let timezonediff = -date.getTimezoneOffset()*60;
    // let now = (date.getTime()/1000)+timezonediff;
    let now = (date.getTime()/1000);

    let param = {"start": (now-300), "end": now};
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
