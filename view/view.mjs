export class View {

    renderWeather(weather) {
        let now = new Date()
        let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
        let startArray
        for (let i = 0; i < weather.length; i++) {
            if (this.dateChecker(weather[i].timestamp)) {
                startArray = i
            }
        }

        if (typeof window !== 'undefined') {
            let weatherDays = [];
            for (let i = startArray; i < weather.length; i++) {
                let newLi = document.createElement("li")
                let divWD = document.createElement("div")
                let divWI = document.createElement("div")
                let image = document.createElement("img")
                let divWT = document.createElement("div")
                let divWTmin = document.createElement("div")
                let divWTmax = document.createElement("div")
                let day = new Date(weather[i].timestamp * 1000)

                if (day.getDate() == now.getDate()) {
                    divWD.innerText = "Heute"
                } else {
                    divWD.innerText = days[day.getDay()]
                }

                divWD.className = "weather-day"
                divWI.className = "weather-icon"
                image.src = "http://openweathermap.org/img/wn/" + weather[i].icon + "@2x.png"
                divWT.className = "weather-temperatur"
                divWTmax.className = "weather-temp-max"
                divWTmin.className = "weather-temp-min"
                divWTmin.innerText = Math.round(weather[i].tempmin) + "°"
                divWTmax.innerText = Math.round(weather[i].tempmax) + "°"

                newLi.appendChild(divWD)
                newLi.appendChild(divWI).appendChild(image)
                newLi.appendChild(divWT)
                divWT.appendChild(divWTmin)
                divWT.appendChild(divWTmax)
                weatherDays.push(newLi);
            }
            let tableWeather = document.getElementById("table-weather");
            if (tableWeather.hasChildNodes()) {
                let oldLis = document.getElementById("table-weather").querySelectorAll("li");
                let i = 0
                for (const oldLiElement of oldLis) {
                    document.getElementById("table-weather").replaceChild(weatherDays[i], oldLiElement)
                    i++
                }
            } else {
                for (const weatherDay of weatherDays) {
                    document.getElementById("table-weather").appendChild(weatherDay)
                }
            }
        }
    }

    renderTitel(powerCurrent, pVcurrent) {
        let HvL1Icon = document.createElement("img")
        let HvL2Icon = document.createElement("img")
        HvL1Icon.className = "HvL-icon"
        HvL2Icon.className = "HvL-icon"

        if (powerCurrent.power > 0) {
            document.getElementById("currentPower").innerText = Math.round(powerCurrent.power) + "W"
            HvL2Icon.src = "./img/Pfeil-links.svg"
        } if(powerCurrent.power === undefined){
            document.getElementById("currentPower").innerText = "0W"
        } else{
            document.getElementById("currentPower").innerText = Math.round(powerCurrent.power * -1) + "W"
            HvL2Icon.src = "./img/Pfeil-rechts.svg"
        }

        if (pVcurrent.power === undefined) {
            document.getElementById("currentPVA").innerText = "0W"
        } else {
            document.getElementById("currentPVA").innerText = pVcurrent.power + "W"
            HvL1Icon.src = "./img/Pfeil-rechts.svg"
        }

        if (document.getElementById("HvL1-icon").hasChildNodes()) {
            let old = document.getElementById("HvL1-icon").querySelector("img")
            document.getElementById("HvL1-icon").replaceChild(HvL1Icon, old)
        } else {
            document.getElementById("HvL1-icon").appendChild(HvL1Icon)
        }
        if (document.getElementById("HvL2-icon").hasChildNodes()) {
            let old = document.getElementById("HvL2-icon").querySelector("img")
            document.getElementById("HvL2-icon").replaceChild(HvL2Icon, old)
        } else {
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

            if (htmlbase.hasChildNodes()) {
                let htmlBaseElements = htmlbase.getElementsByClassName("device-box")
                let i = 0
                for (const htmlbaseElement of htmlBaseElements) {
                    document.getElementById("device").replaceChild(devices[i], htmlbaseElement)
                    i++
                }
            } else {
                for (const device of devices) {
                    htmlbase.appendChild(device)
                }
            }
        }
    }

    renderChart(chartData) {
        let array = this.creatTableChartData(chartData)
        return new Highcharts.chart('container', {
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
                    const timezonediff = date.getTimezoneOffset() * 60;
                    let m = new Date(this.x).getMinutes();
                    if (String(m).length < 2) {
                        m = String('0' + m);
                    }
                    let h = new Date(this.x + timezonediff).getUTCHours();
                    return [h + ':' + m].concat(
                        this.points ?
                            this.points.map(function (point) {
                                return '<br>' + point.series.name + ': ' + (point.y / 1000).toFixed(2) + point.series.tooltipOptions.valueSuffix;
                            }) : []
                    );
                }
            },
            yAxis: [
                {
                    id: 'power',
                    title: {text: 'Power'},
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + ' kW';
                        },
                        style: {color: '#ffffff'}
                    },
                    softMin: 0
                },
                {
                    id: 'energy',
                    title: {text: 'Energy'},
                    labels: {
                        formatter: function () {
                            return (this.value / 1000).toFixed(0) + ' kWh';
                        },
                        style: {color: '#00b300'}
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
                tickInterval: 3600 * 1000, // 30min in milliseconds
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'center',
                    x: 0,
                    y: 24,
                    style: {color: '#ffffff'}
                }
            },
            legend: {
                itemStyle: {
                    'color': '#ffffff'
                }
            },
            series: array
        });
    }

    renderTableHeader(data) {
        let chartData = this.creatTableChartData(data)
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
            data.data.reverse()
            for (const tabledata of data.data) {
                let tr = document.createElement("tr")
                let td1 = document.createElement("td")
                let td2 = document.createElement("td")
                let date = new Date(tabledata.name)
                tr.className = "table-tr"
                if (date.getHours() > 7) {
                    td1.innerText = this.timeFormatter(date)
                    td2.innerText = (Math.round(tabledata.y) / 1000) + data.tooltip.valueSuffix
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

    // Helper Function
    timeFormatter(date) {
        let hours
        let minutes
        if (date.getHours() < 10) {
            hours = "0" + date.getHours()
        } else {
            hours = date.getHours()
        }
        if (date.getMinutes() < 10) {
            minutes = "0" + date.getMinutes()
        } else {
            minutes = date.getMinutes()
        }
        let zeit = hours + ":" + minutes
        return zeit
    }

    creatTableChartData(chartData){
        let dataArray = [
            this.chartFormatter(0, 'pvenergy', 'PV-Energie', true, 'spline',
                0, 1, 0, '#0000ff', 4, 1, ' kWh', false,
                chartData[0]),
            this.chartFormatter(1, 'pvpower', 'PV-Stromproduktion', true, 'areaspline',
                0, 0, 0, '#ffff4d', 0, 1, ' kW', false,
                chartData[1]),
            this.chartFormatter(2, 'power', 'Stromverkauf', true, 'areaspline',
                0, 0, 0, '#00ff00', 0, 0.8, ' kW', false,
                chartData[2]),
            this.chartFormatter(3, 'power', 'Strombezug', false, 'areaspline',
                0, 0, '#90EE90', '#ff9999', 0, 1, ' kW', false,
                chartData[3]),
            this.chartFormatter(4, 'power', 'Stromkauf', true, 'areaspline',
                    0, 0, 0, '#ff3385', 4, 0.9, ' kW', false,
                chartData[4]),
            this.chartFormatter(5, 'consumpower', 'Stromverbrauch', true, 'spline',
                'ShortDashDot', 0, 0, '#800000', 2, 1, ' kW', false,
                chartData[5])]
        return dataArray
    }

    chartFormatter(index, id, name, visible, type, dashStyle, y, negativeColor, color, line, opacity, valueSuffix, marker, data) {
        let object = {
            index: index,
            id: id,
            name: name,
            visible: visible,
            type: type,
            dashStyle: dashStyle,
            yAxis: y,
            negativeColor: negativeColor,
            color: color,
            lineWidth: line,
            opacity: opacity,
            tooltip: {
                valueSuffix: valueSuffix
            },
            marker: {
                enabled: marker
            },
            data: data
        }
        return object
    }

    dateChecker(date) {
        let dateTest = new Date(date * 1000)
        let dateToday = new Date()

        if (dateTest.getMonth() == dateToday.getMonth() && dateTest.getFullYear() == dateToday.getFullYear()
            && dateTest.getDate() == dateToday.getDate()) {
            return true
        } else {
            return false
        }
    }
}
