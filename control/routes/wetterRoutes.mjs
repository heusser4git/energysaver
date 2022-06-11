import express from 'express';
import Repository from "../../model/database/weather/Repository.mjs";
import {Weather} from "../../model/Weather.mjs";
const Router = express.Router();

const repo = new Repository();

// http://localhost:<port>/wetter/daily/1652554800-1652558400
Router.get("/daily/:start-:end", (req, res)=>{
    let param = {"start": req.params.start, "end": req.params.end};
    if(!isNaN(req.params.start) && !isNaN(req.params.end)) {
        const data = repo.getWeather(param);
        data.then((success)=>{
            res.send(success);
        }).catch((failure) => {
            console.error(failure);
        });
    } else {
        res.sendStatus(405);
    }
});

// http://localhost:<port>/wetter/daily/
export default Router.get("/daily", (req, res)=>{
    const data = repo.getWeather(new Weather(null, 'daily'));
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.error(failure);
    });
});

