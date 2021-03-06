function goChart(data= {}) {
    return  new Highcharts.chart('container', {
        chart: {
            type: 'spline',
            backgroundColor: null,
            width: '1000',
            //height: '350'
        },
        title: {
            text: ''
        },
        credits: {enabled: false},
        tooltip: {
            shared: true,
            formatter: function () {
                let date = new Date();
                const timezonediff = date.getTimezoneOffset()*60;
                let m = new Date(this.x).getMinutes();
                if(String(m).length<2) {
                    m = String('0' + m);
                }
                let h = new Date(this.x + timezonediff).getUTCHours();
                return [h + ':' + m].concat(
                    this.points ?
                        this.points.map(function (point) {
                            return '<br>' + point.series.name + ': ' + (point.y/1000).toFixed(2) + point.series.tooltipOptions.valueSuffix;
                        }) : []
                );
            }
        },
        yAxis: [
            {
                id: 'power',
                title: { text: 'Power'},
                labels: { formatter: function() {	return this.value/1000 + ' kW';} },
                softMin: 0
            },
            {
                id: 'energy',
                title: { text: 'Energy' },
                labels: {
                    formatter: function() {	return (this.value/1000).toFixed(0) + ' kWh';},
                    style: { color: '#00b300' }
                },
                min: 0,
                showEmpty: false,
                gridLineWidth: 0,
                opposite: true,
                lineColor: '#006600'
            }
        ],
        xAxis: {
            type: 'datetime',
            tickInterval: 3600  * 1000, // 30min in milliseconds
            tickWidth: 0,
            gridLineWidth: 1,
            labels: {
                align: 'center',
                x: 0,
                y: 24
            }
        },
        series: data
    });
}


async function getChartData() {
    let chartdatas = [];
    const powerFetch = await fetch('../power/today');
    if(powerFetch.status==200) {
        const timezonediff = new Date().getTimezoneOffset()*60;
        let data = await powerFetch.json();
        data = data.sort((a,b)=> a.tstamp - b.tstamp);
        let datapointsPower = []
        let datapointsPowerSale = [];
        let datapointsPowerPurchase = [];
        for(let d of data) {
            // zeitzohne einbeziehen
            let date = new Date(d.tstamp_interval);
            dateUnix = (date.getTime()/1000)-timezonediff;
            datapointsPower.push({ name: new Date(dateUnix*1000), y: d.power, x: dateUnix*1000 });
            if(d.power>0) {
                // Bezug
                datapointsPowerPurchase.push({ name: new Date(dateUnix*1000), y: d.power, x: dateUnix*1000 });
                datapointsPowerSale.push({ name: new Date(dateUnix*1000), y: 0, x: dateUnix*1000 });
            } else {
                // verauf
                datapointsPowerPurchase.push({ name: new Date(dateUnix*1000), y: 0, x: dateUnix*1000 });
                datapointsPowerSale.push({ name: new Date(dateUnix*1000), y: -d.power, x: dateUnix*1000 });
            }
        }

        let chartdataPVpower;
        let chartdataPVenergy;
        let datapv;
        const pvdataFetch = await fetch('../pvdata/today');
        if(pvdataFetch.status==200) {
            datapv = await pvdataFetch.json();
            datapv = datapv.sort((a,b)=> a.timestamp - b.timestamp);
            let pvPowerDatapoints = [];
            let pvEnergyDatapoints = [];
            let datapointsConsumtion = [];
            for(let d of datapv) {
                let date = new Date((d.timestamp-timezonediff) * 1000);
                let unixDate = ((d.timestamp-timezonediff)*1000);
                let pvPower = d.power;
                // pv power
                pvPowerDatapoints.push({ name: date, y: pvPower, x: unixDate });

                // pv energy
                pvEnergyDatapoints.push({ name: date, y: d.energy, x: unixDate });

                // // get the power entry from the actual datapoint
                // let actualDatapointConsumptionArray = datapointsPower.filter(value => value.x === unixDate);
                // if(actualDatapointConsumptionArray.length===1) {
                //     let actualDatapointConsumption = actualDatapointConsumptionArray[0];
                //     let power = actualDatapointConsumption.y;
                //
                //     let consumtionPower = -(-power - pvPower);
                //     if(consumtionPower<0) {
                //         consumtionPower = 0;
                //     }
                //
                //     datapointsConsumtion.push({ name: date, y: consumtionPower, x: unixDate})
                // }
            }
            for(let powerDataPoint of datapointsPower) {
                let date = powerDataPoint.name;
                let unixDate = powerDataPoint.x;
                let power = powerDataPoint.y;

                // get the pvPower entry from the actual datapoint
                let actualDatapointPvPowerArray = pvPowerDatapoints.filter(entry => entry.x === unixDate);
                if(actualDatapointPvPowerArray.length===1) {
                    let actualDatapointPvPower = actualDatapointPvPowerArray[0];
                    let pvPower = actualDatapointPvPower.y;

                    let consumtionPower = -(-power - pvPower);
                    if(consumtionPower<0) {
                        consumtionPower = 0;
                    }

                    datapointsConsumtion.push({ name: date, y: consumtionPower, x: unixDate})
                }
            }
            chartdatas = [ {
                index: 0,
                id: 'pvenergy',
                name: 'PV-Energie',
                type: 'spline',
                yAxis: 1,
                color: '#00b300',
                lineWidth: 4,
                tooltip: {
                    valueSuffix: ' kWh'
                },
                marker: {
                    enabled: false
                },
                data: pvEnergyDatapoints
            },
                {
                index: 1,
                id: 'pvpower',
                name: 'PV-Stromproduktion',
                type: 'areaspline',
                yAxis: 0,
                color: '#ffe066',
                opacity: 0.6,
                tooltip: {
                    valueSuffix: ' kW'
                },
                marker: {
                    enabled: false
                },
                data: pvPowerDatapoints
            },
                {
                index: 2,
                id: 'power',
                name: 'Stromverkauf',
                type: 'areaspline',
                yAxis: 0,
                color: '#90EE90',
                opacity: 0.8,
                tooltip: {
                    valueSuffix: ' kW'
                },
                marker: {
                    enabled: false
                },
                data: datapointsPowerSale
            }, {
                index: 3,
                id: 'power',
                name: 'Strombezug',
                visible: false,
                type: 'areaspline',
                yAxis: 0,
                negativeColor: '#90EE90',
                color: '#ff9999',
                tooltip: {
                    valueSuffix: ' kW'
                },
                marker: {
                    enabled: false
                },
                data: datapointsPower
            }, {
                index: 4,
                id: 'power',
                name: 'Stromkauf',
                type: 'areaspline',
                yAxis: 0,
                color: '#ff4d4d',
                tooltip: {
                    valueSuffix: ' kW'
                },
                marker: {
                    enabled: false
                },
                data: datapointsPowerPurchase
            }, {
                index: 5,
                id: 'consumpower',
                name: 'Stromverbrauch',
                type: 'spline',
                dashStyle: 'ShortDashDot',
                yAxis: 0,
                color: '#800000',
                tooltip: {
                    valueSuffix: ' kW'
                },
                marker: {
                    enabled: false
                },
                data: datapointsConsumtion
            }];
        }
        return chartdatas;
    }
}
// initiale chart-anzeige

getChartData().then((chartData)=>{
    goChart(chartData);
}).catch((onerror)=>{console.error(onerror)});

// update chart alle 5 min
setInterval(()=>{
    getChartData().then((chartData)=>{
        goChart(chartData);
    }).catch((onerror)=>{console.error(onerror)});
}, 300000);

