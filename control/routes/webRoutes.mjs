import express from 'express';
import path from "path";
const Router = express.Router();



// http://localhost:<port>/
export default Router.get("/", (req, res)=>{
    console.log('route /')
    res.sendFile(path.join(process.cwd() + '/view/index.html'));
});


Router.get("/:file", (req, res)=>{
    console.log('route /app')
    res.sendFile(path.join(process.cwd() + '/view/' + req.params.file));
});