import express from 'express';
import bodyParser from 'body-parser';
import WetterRoutes from './control/routes/wetterRoutes.mjs';
import PvDataRoutes from './control/routes/pvDataRoutes.mjs';
import PowerRoutes from './control/routes/powerRoutes.mjs';
import WebRoutes from './control/routes/webRoutes.mjs';
import {Openweathermap} from "./model/restsource/Openweathermap.mjs";
import Shelly from "./model/restsource/Shelly.mjs";
import {Repository as powerRepo} from "./model/database/power/Repository.mjs";
import {Repository as pvRepo} from "./model/database/sbfspot/Repository.mjs";
import Demosbfspot from "./control/demodatagenerator/Demossbfspot.mjs";

const app = express();
app.use(bodyParser.json());
app.use("/wetter", WetterRoutes);
app.use("/pvData", PvDataRoutes);
app.use("/power", PowerRoutes);
app.use("/", WebRoutes);

const port = 1234;
app.listen(port, () => console.log('Server ready on Port ' + port));

const DEMOMODE = 2;

const weatherApi = new Openweathermap();
// intial einlesen des wetters
weatherApi.run()
// wetter stuendlich einlesen
const intervalWeather = setInterval(() => { weatherApi.run() }, 3600000);



if(DEMOMODE===1) {
    // DEMOMODE FOR SCHOOL
    // create demo data for power-messurement
    const repoPower = new powerRepo();
    const intervalPowerDemo = setInterval(() => {
        let promise = repoPower.createDemoPower(new Date().getTime()/1000);
        promise.catch((onerror)=>{
            console.error(onerror)
        })
    }, 5000);

    let d = new Demosbfspot();
    d.deleteTodaysPVData();
    d.createDemoDataFromTemplatePVDay();

} else if(DEMOMODE===2) {
    // demomode for at home without pvData
    let d = new Demosbfspot();
    d.deleteTodaysPVData();
    d.createDemoDataFromTemplatePVDay();

    const powerApi = new Shelly();
    const intervalPower = setInterval(() => { powerApi.run() }, 5000);
} else {
    // PRODUCTION MODE
    // power einlesen alle 5 sekunden
    const powerApi = new Shelly();
    const intervalPower = setInterval(() => { powerApi.run() }, 5000);
}







// FORMAT FullMinutes
Date.prototype.getFullMinutes = function () {
    if (this.getMinutes() < 10) {
        return '0' + this.getMinutes();
    }
    return this.getMinutes();
};

// Unix-Timestamp to CH-DateTime-String
function unixToDateTimeString(unix) {
    let date = new Date(unix * 1000);
    let month = date.getMonth();
    if(String(month).length==1) {
        month = '0' + month;
    }
    let day = date.getDay();
    if(String(day).length==1) {
        day = '0' + day;
    }
    return date.getDay() + "." + month + "." + date.getFullYear() + " " + unixToTimeString(unix);
}

function unixToTimeString(unix) {
    let date = new Date(unix * 1000);
    return date.getHours() + ":" + date.getFullMinutes();
}