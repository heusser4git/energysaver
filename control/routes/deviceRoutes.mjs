import express from 'express';
import {Repository} from "../../model/service/device/Repository.mjs";
const Router = express.Router();

const repo = new Repository();


// http://localhost:<port>/device/
export default Router.get("/", (req, res)=>{
    const data = repo.getDeviceData({});
    data.then((success)=>{
        res.send(success);
    }).catch((failure) => {
        console.error(failure);
    });
});
