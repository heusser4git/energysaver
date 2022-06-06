import express from 'express';
import path from "path";
const Router = express.Router();

export default Router.get("/", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/index.html'));
});

Router.get("/:file", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/' + req.params.file));
});

Router.get("/uh/:file", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/uh/' + req.params.file));
});

Router.get("/mp/:file", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/mp/' + req.params.file));
});
Router.get("/img/:file", (req, res)=>{
    res.sendFile(path.join(process.cwd() + '/view/img/' + req.params.file));
});