import express from 'express';
import Repository from "../../model/database/weather/Repository.mjs";
import {Weather} from "../../model/Weather.mjs";
const Router = express.Router();

const repo = new Repository();


// http://localhost:<port>/wetter/daily/1652554800-1652558400
Router.get("/daily/:start-:end", (req, res)=>{
    let param = {"start": req.params.start, "end": req.params.end};
    const data = repo.getWeather(param);
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.log(failure);
    });
});

// http://localhost:<port>/wetter/daily/
export default Router.get("/daily", (req, res)=>{
    console.log("route /");
    const data = repo.getWeather(new Weather(null, 'daily'));
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.log(failure);
    });
});

// http://localhost:<port>/wetter/daily/449
Router.get("/daily/:id", (req, res)=>{
    console.log("route /:id");
    const data = repo.getWeather(new Weather(req.params.id, 'daily'));
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.log(failure);
    });
});
