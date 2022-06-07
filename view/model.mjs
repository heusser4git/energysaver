export class Model{

    async loadWeatherData(){
        const response = await fetch('../wetter/daily')
        if(response.status == 200){
            this.weatherData = await response.json();
        }
        return this.weatherData;
    }

    async loadPowerCurrent(){
        const response = await fetch('../power/current')
        if(response.status == 200){
            this.powerCurrentData = await response.json()
        }
        return this.powerCurrentData
    }

    async loadPVCurrent(){
        const response = await fetch('../pvdata/current')
        if(response.status == 200){
            this.powerCurrentData = await response.json()
        }
        return this.powerCurrentData
    }

    async loadDevice(){
        const response = await fetch('../device')
        if(response.status ==200){
            this.deviceData = await response.json()
        }
        return this.deviceData
    }

    async loadChartData() {
        let chartdatas = [];

        const powerFetch = await fetch('../power/today');
        if (powerFetch.status == 200) {
            const timezonediff = new Date().getTimezoneOffset() * 60;
            let data = await powerFetch.json();
            data = data.sort((a, b) => a.tstamp - b.tstamp);
            let datapointsPower = []
            let datapointsPowerSale = [];
            let datapointsPowerPurchase = [];
            for (let d of data) {
                // zeitzohne einbeziehen
                let date = new Date(d.tstamp_interval);
                let dateUnix = (date.getTime() / 1000) - timezonediff;
                datapointsPower.push({name: new Date(dateUnix * 1000), y: d.power, x: dateUnix * 1000});
                if (d.power > 0) {
                    // Bezug
                    datapointsPowerPurchase.push({name: new Date(dateUnix * 1000), y: d.power, x: dateUnix * 1000});
                    datapointsPowerSale.push({name: new Date(dateUnix * 1000), y: 0, x: dateUnix * 1000});
                } else {
                    // verkauf
                    datapointsPowerPurchase.push({name: new Date(dateUnix * 1000), y: 0, x: dateUnix * 1000});
                    datapointsPowerSale.push({name: new Date(dateUnix * 1000), y: -d.power, x: dateUnix * 1000});
                }
            }

            let datapv;
            const pvdataFetch = await fetch('../pvdata/today');
            if (pvdataFetch.status == 200) {
                datapv = await pvdataFetch.json();
                datapv = datapv.sort((a, b) => a.timestamp - b.timestamp);
                let pvPowerDatapoints = [];
                let pvEnergyDatapoints = [];
                let datapointsConsumtion = [];
                for (let d of datapv) {
                    let date = new Date((d.timestamp - timezonediff) * 1000);
                    let unixDate = ((d.timestamp - timezonediff) * 1000);
                    let pvPower = d.power;
                    // pv power
                    pvPowerDatapoints.push({name: date, y: pvPower, x: unixDate});

                    // pv energy
                    pvEnergyDatapoints.push({name: date, y: d.energy, x: unixDate});

                }
                for (let powerDataPoint of datapointsPower) {
                    let date = powerDataPoint.name;
                    let unixDate = powerDataPoint.x;
                    let power = powerDataPoint.y;

                    // get the pvPower entry from the actual datapoint
                    let actualDatapointPvPowerArray = pvPowerDatapoints.filter(entry => entry.x === unixDate);
                    if (actualDatapointPvPowerArray.length === 1) {
                        let actualDatapointPvPower = actualDatapointPvPowerArray[0];
                        let pvPower = actualDatapointPvPower.y;

                        let consumtionPower = -(-power - pvPower);
                        if (consumtionPower < 0) {
                            consumtionPower = 0;
                        }
                        datapointsConsumtion.push({name: date, y: consumtionPower, x: unixDate})
                    }
                }
                chartdatas[0] = pvEnergyDatapoints
                chartdatas[1] = pvPowerDatapoints
                chartdatas[2] = datapointsPowerSale
                chartdatas[3] = datapointsPower
                chartdatas[4] = datapointsPowerPurchase
                chartdatas[5] = datapointsConsumtion
            }
            return chartdatas;
        }
    }

}