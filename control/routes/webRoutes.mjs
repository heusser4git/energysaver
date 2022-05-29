import express from 'express';
import path from "path";
const Router = express.Router();



// http://localhost:<port>/
export default Router.get("/", (req, res)=>{
    console.log('route /')
    res.sendFile(path.join(process.cwd() + '/view/index.html'));
});


Router.get("/:file", (req, res)=>{
    console.log('route /:file ' + req.params.file)
    res.sendFile(path.join(process.cwd() + '/view/' + req.params.file));
});

Router.get("/uh/:file", (req, res)=>{
    console.log('route /:file ' + req.params.file)
    res.sendFile(path.join(process.cwd() + '/view/uh/' + req.params.file));
});

Router.get("/mp/:file", (req, res)=>{
    console.log('route /:file ' + req.params.file)
    res.sendFile(path.join(process.cwd() + '/view/mp/' + req.params.file));
});
