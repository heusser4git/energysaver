
getDeviceData()
    .then((deviceData)=>{
        getPowerCurrent()
            .then((powerCurrent)=>{
                getPvCurrent()
                    .then((PvCurrent)=>{
                        goDevice(deviceData,powerCurrent)
                        goTitel(powerCurrent,PvCurrent)
                    })
            })
    }).catch((onerror)=>{console.error(onerror)})


async function getPowerCurrent(){
    let powerCurrent
    const powerFetch = await fetch('../power/current')
    if(powerFetch.status == 200){
        powerCurrent = await powerFetch.json()
    }
    return powerCurrent
}

async function getPvCurrent(){
    let pvCurrent
    const pvFetch = await fetch('../pvdata/current')
    if(pvFetch.status == 200){
        pvCurrent = await pvFetch.json()
    }
    return pvCurrent
}

async function getDeviceData(){
    let dataDevice
    const deviceFetch = await fetch('../device')
    if(deviceFetch.status ==200){
        dataDevice = await deviceFetch.json()
    }
    return dataDevice
}

function goTitel(powerCurrent = {}, PVCurrent = {}){
    if(powerCurrent.power > 0){
        document.getElementById("currentPower").innerText = "aktuell beziehen wir: " + powerCurrent.power +"W"
    }else {
        document.getElementById("currentPower").innerText = "aktuell verkaufen wir: " + powerCurrent.power +"W"
    }

    if (PVCurrent.power == 'undefined'){
        document.getElementById("currentPVA").innerText = "Die PVA liefert im Moment: " + PVCurrent.power +"W"
    } else {
        document.getElementById("currentPVA").innerText = "Die PVA liefert im Moment: 0W"
    }

}

function goDevice(data = {},powerCurrent = {}){
    let Power = powerCurrent.power * -1
    if(typeof window !== 'undefined'){
        for (let i = 0; i < 3; i++) {
            let deviceDiv = document.createElement("div")
            let deviceDivName = document.createElement("div")
            let deviceDivPower = document.createElement("div")
            let deviceDivIcon = document.createElement("div")
            let deviceImg = document.createElement("img")

            deviceDiv.className = "device"
            deviceDivName.className = "device-name"
            deviceDivPower.className = "device-power"
            deviceDivIcon.className = "device-icon"
            deviceImg.className = "device-img"

            if(Power >= data[i].power){
                deviceImg.src ="./img/haken.svg"
            }else {
                deviceImg.src ="./img/kreuz.svg"
            }

            deviceDivName.innerText = data[i].name
            deviceDivPower.innerText = "(" + data[i].power + "W)"

            let htmlbase = document.getElementById("device")
            htmlbase.appendChild(deviceDiv).appendChild(deviceDivName)
            deviceDiv.appendChild(deviceDivPower)
            deviceDiv.appendChild(deviceDivIcon).appendChild(deviceImg)
        }
    }
}