import express from 'express';
import path from "path";
const Router = express.Router();

export default Router.get("/", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/index.html'));
});

Router.get("/:file", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/' + req.params.file));
});

Router.get("/img/:file", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/img/' + req.params.file));
});