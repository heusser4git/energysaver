const DEMOMODE = 1;

import express from 'express';
import WetterRoutes from './control/routes/wetterRoutes.mjs';
import PvDataRoutes from './control/routes/pvDataRoutes.mjs';
import PowerRoutes from './control/routes/powerRoutes.mjs';
import DeviceRoutes from './control/routes/deviceRoutes.mjs';
import WebRoutes from './control/routes/webRoutes.mjs';
import {Openweathermap} from "./model/restsource/Openweathermap.mjs";
import Shelly from "./model/restsource/Shelly.mjs";
import Demosbfspot from "./control/demodatagenerator/Demossbfspot.mjs";
import Demopower from "./control/demodatagenerator/Demopower.mjs";

/**
 * REST-Server
 */
const app = express();
app.use("/wetter", WetterRoutes);
app.use("/pvData", PvDataRoutes);
app.use("/power", PowerRoutes);
app.use("/device", DeviceRoutes);
app.use("/", WebRoutes);

const port = 1234;
app.listen(port, () => console.log('Server ready on Port ' + port));





/**
 * Daten einlesen
 */

const weatherApi = new Openweathermap();
// intial einlesen des wetters
weatherApi.run()
// wetter stuendlich einlesen
const intervalWeather = setInterval(() => { weatherApi.run() }, 3600000);


if(DEMOMODE>0) {
    console.log('Demo-Mode startet: ' + DEMOMODE)
}
if(DEMOMODE===1) {
    // DEMOMODE FOR SCHOOL

    let pDemo = new Demopower();
    pDemo.deleteTodaysPowerData();
    pDemo.createDemoDataFromTemplatePowerDay();

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