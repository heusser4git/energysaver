export class View{

    renderWeather(weather){
        let now = new Date()
        let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
        let numDay = now.getDay()
        let day = numDay

        if (typeof window!== 'undefined'){
            let weatherDays = [];
            for (let i = 0; i < 8; i++) {
                let newLi = document.createElement("li")
                let divWD = document.createElement("div")
                let divWI = document.createElement("div")
                let image = document.createElement("img")
                let divWT = document.createElement("div")
                let divWTmin = document.createElement("div")
                let divWTmax = document.createElement("div")

                if(numDay + i == 7){
                    day = 0
                }
                if (i === 0){
                    divWD.innerText = "Heute"
                }else{
                    divWD.innerText = days[day]
                }day++

                divWD.className = "weather-day"
                divWI.className = "weather-icon"
                image.src = "http://openweathermap.org/img/wn/"+ weather[i+2].icon +"@2x.png"
                divWT.className = "weather-temperatur"
                divWTmax.className = "weather-temp-max"
                divWTmin.className = "weather-temp-min"
                divWTmin.innerText  = Math.round(weather[i+2].tempmin) + "°"
                divWTmax.innerText  = Math.round(weather[i+2].tempmax) + "°"

                newLi.appendChild(divWD)
                newLi.appendChild(divWI).appendChild(image)
                newLi.appendChild(divWT)
                divWT.appendChild(divWTmin)
                divWT.appendChild(divWTmax)
                weatherDays.push(newLi);
            }
            let tableWeather = document.getElementById("table-weather");
            if(tableWeather.hasChildNodes()) {
                let oldLis = document.getElementById("table-weather").querySelectorAll("li");
                let i = 0
                for (const oldLiElement of oldLis) {
                    document.getElementById("table-weather").replaceChild(weatherDays[i], oldLiElement)
                    i++
                }
            }else {
                for (const weatherDay of weatherDays) {
                    document.getElementById("table-weather").appendChild(weatherDay)
                }
            }
        }
    }

    renderTitel(powerCurrent, pVcurrent){
        let HvL1Icon = document.createElement("img")
        let HvL2Icon = document.createElement("img")
        HvL1Icon.className = "HvL-icon"
        HvL2Icon.className = "HvL-icon"

        if(powerCurrent.power > 0){
            document.getElementById("currentPower").innerText = Math.round(powerCurrent.power) +"W"
            HvL2Icon.src ="./img/Pfeil-links.svg"
        }else {
            document.getElementById("currentPower").innerText = Math.round(powerCurrent.power*-1) +"W"
            HvL2Icon.src ="./img/Pfeil-rechts.svg"
        }

        if (pVcurrent.power === undefined){
            document.getElementById("currentPVA").innerText = "0W"
        } else {
            document.getElementById("currentPVA").innerText = pVcurrent.power +"W"
            HvL1Icon.src ="./img/Pfeil-rechts.svg"
        }

        if (document.getElementById("HvL1-icon").hasChildNodes()){
           let old = document.getElementById("HvL1-icon").querySelector("img")
            document.getElementById("HvL1-icon").replaceChild(HvL1Icon,old)
        }else {
            document.getElementById("HvL1-icon").appendChild(HvL1Icon)
        }
        if(document.getElementById("HvL2-icon").hasChildNodes()){
            let old = document.getElementById("HvL2-icon").querySelector("img")
            document.getElementById("HvL2-icon").replaceChild(HvL2Icon,old)
        }else {
            document.getElementById("HvL2-icon").appendChild(HvL2Icon)
        }
        document.getElementById("HvL1-icon").style = "text-align: center"
        document.getElementById("HvL2-icon").style = "text-align: center"
    }

    renderDevice(deviceData, powerCurrent) {
        let Power = powerCurrent.power * -1
        let devices = [];
        let htmlbase = document.getElementById("device");
        if (typeof window !== 'undefined') {
            for (let i = 0; i < deviceData.length; i++) {
                let deviceDiv = document.createElement("div")
                let deviceDivName = document.createElement("div")
                let deviceDivPower = document.createElement("div")
                let deviceDivIcon = document.createElement("div")
                let deviceImg = document.createElement("img")
                let divleft = document.createElement("div")
                let divright = document.createElement("div")

                deviceDiv.className = "device-box"
                deviceDivName.className = "device-name"
                deviceDivPower.className = "device-power"
                deviceDivIcon.className = "device-icon"
                deviceImg.className = "device-img"

                if (Power >= deviceData[i].power) {
                    deviceImg.src = "./img/" + deviceData[i].nameshort + "-enabled.svg"
                } else {
                    deviceImg.src = "./img/" + deviceData[i].nameshort + "-disabled.svg"
                }

                deviceDivName.innerText = deviceData[i].name
                deviceDivPower.innerText = "(" + deviceData[i].power + "W)"

                deviceDiv.appendChild(divleft).appendChild(deviceDivName)
                deviceDiv.appendChild(divleft).appendChild(deviceDivPower)
                deviceDiv.appendChild(divright).appendChild(deviceDivIcon).appendChild(deviceImg)
                devices.push(deviceDiv)
            }

            if(htmlbase.hasChildNodes()){
                let htmlBaseElements = htmlbase.getElementsByClassName("device-box")
                let i = 0
                for (const htmlbaseElement of htmlBaseElements) {
                    document.getElementById("device").replaceChild(devices[i],htmlbaseElement)
                    i++
                }
            }else {
                for (const device of devices) {
                    htmlbase.appendChild(device)
                }
            }
        }
    }

    renderChart(chartData){
        return  new Highcharts.chart('container', {
            chart: {
                type: 'spline',
                backgroundColor: null,
                width: '1000',
                height: '350'
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
            series: chartData
        });
    }

    renderTableHeader(chartData){
        let divs = []
        let i = 0
        for (const data of chartData) {
            let div1 = document.createElement("div")
            let details = document.createElement("details")
            let summary = document.createElement("summary")
            let div2 = document.createElement("div")
            let div3 = document.createElement("div")
            let table = document.createElement("table")

            div2.innerText = data.name
            div2.className = "table-header"
            div1.id = i
            for (const tabledata of data.data) {
                let tr = document.createElement("tr")
                let td1 = document.createElement("td")
                let td2 = document.createElement("td")
                let date = new Date(tabledata.name)
                if(date.getHours() >7){
                    td1.innerText = (date.getHours() - 2) +":" + date.getMinutes()
                    td2.innerText = (Math.round(tabledata.y) / 1000) + " kWh"
                    div3.appendChild(tr).appendChild(td1)
                    tr.appendChild(td2)
                }
            }
            div1.appendChild(details).appendChild(summary).appendChild(div2)
            details.appendChild(div3).appendChild(table)
            divs.push(div1)
            i++
        }
        for (const div of divs) {
            document.getElementById("table").appendChild(div)
        }
    }

}