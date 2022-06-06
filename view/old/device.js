
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

    if (PVCurrent.power === undefined){
        document.getElementById("currentPVA").innerText = "0W"
        //HvL1Icon.src ="./img/Pfeil-rechts.svg"
    } else {
        document.getElementById("currentPVA").innerText = PVCurrent.power +"W"
        HvL1Icon.src ="./img/Pfeil-rechts.svg"
    }
    document.getElementById("HvL1-icon").appendChild(HvL1Icon)
    document.getElementById("HvL2-icon").appendChild(HvL2Icon)
    document.getElementById("HvL1-icon").style = "text-align: center"
    document.getElementById("HvL2-icon").style = "text-align: center"
}

function goDevice(data = {},powerCurrent = {}){
    let Power = powerCurrent.power * -1
    if(typeof window !== 'undefined'){
        for (let i = 0; i < data.length; i++) {
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

            if(Power >= data[i].power){
                deviceImg.src ="./img/"+ data[i].nameshort + "-enabled.svg"
            }else {
                deviceImg.src ="./img/"+ data[i].nameshort + "-disabled.svg"
            }

            deviceDivName.innerText = data[i].name
            deviceDivPower.innerText = "(" + data[i].power + "W)"

            let htmlbase = document.getElementById("device")
            htmlbase.appendChild(deviceDiv).appendChild(divleft).appendChild(deviceDivName)
            deviceDiv.appendChild(divleft).appendChild(deviceDivPower)
            deviceDiv.appendChild(divright).appendChild(deviceDivIcon).appendChild(deviceImg)


        }
    }
}