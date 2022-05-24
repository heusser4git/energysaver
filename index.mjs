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

const app = express();
app.use(bodyParser.json());
app.use("/wetter", WetterRoutes);
app.use("/pvData", PvDataRoutes);
app.use("/power", PowerRoutes);
app.use("/", WebRoutes);

const port = 1234;
app.listen(port, () => console.log('Server ready on Port ' + port));

const DEMOMODE = 1;

const weatherApi = new Openweathermap();
// intial einlesen des wetters
// weatherApi.run()
// wetter stuendlich einlesen
// const intervalWeather = setInterval(() => { weatherApi.run() }, 3600000);



if(DEMOMODE) {
    // create demo data for power-messurement
    const intervalPowerDemo = setInterval(() => {
        let promise = new powerRepo().createDemoPower(new Date().getTime()/1000);
        promise.catch((onerror)=>{
            console.error(onerror)
        })
    }, 1000);

    // create demodata for pvdata (first create all new data for all day since 6:00 o'clock till now, then create a set every 2.5 minutes)
    const pvdataRepo = new pvRepo();
    pvdataRepo.createPVDemoDataForTodayTillNow()
    const intervalPvdataDemo = setInterval(() => {
        let promise = pvdataRepo.addPvDemoData(new Date().getTime()/1000);
        promise.catch((onerror)=>{
            console.error(onerror)
        })
    }, 1000);

} else {
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
    // TODO Monat muss auch zweistellig sein...
    let date = new Date(unix * 1000);
    return date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " " + unixToTimeString(unix);
}
function unixToTimeString(unix) {
    let date = new Date(unix * 1000);
    return date.getHours() + ":" + date.getFullMinutes();
}