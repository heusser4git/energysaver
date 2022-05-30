import express from 'express';
import {Repository} from "../../model/database/device/Repository.mjs";
const Router = express.Router();

const repo = new Repository();


// http://localhost:<port>/device/
export default Router.get("/", (req, res)=>{
    console.log("route /");
    const data = repo.getDeviceData({});
    data.then((success)=>{
console.log(success)
        res.send(success);
    }).catch((failure) => {
        console.log(failure);
    });
});
