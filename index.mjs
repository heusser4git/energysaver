import express from 'express';
import bodyParser from 'body-parser';
import WetterRoutes from './control/routes/wetterRoutes.mjs';
import PvDataRoutes from './control/routes/pvDataRoutes.mjs';
import PowerRoutes from './control/routes/powerRoutes.mjs';
import WebRoutes from './control/routes/webRoutes.mjs';
import {Openweathermap} from "./model/restsource/Openweathermap.mjs";
import Shelly from "./model/restsource/Shelly.mjs";

const app = express();
app.use(bodyParser.json());
app.use("/wetter", WetterRoutes);
app.use("/pvData", PvDataRoutes);
app.use("/power", PowerRoutes);
app.use("/", WebRoutes);

const port = 1234;
app.listen(port, () => console.log('Server ready on Port ' + port));


const weatherApi = new Openweathermap();
// intial einlesen des wetters
weatherApi.run()
// wetter stuendlich einlesen
const intervalWeather = setInterval(() => { weatherApi.run() }, 3600000);

// power einlesen alle 5 sekunden
const powerApi = new Shelly();
const intervalPower = setInterval(() => { powerApi.run() }, 5000);









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