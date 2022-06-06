//   PV-Energie = ../pvdata/today .energy
//   PV-Stromproduktion = ../pvdata/today .power
//   Stromverkauf = ../power/today .power
//   Strombezug = ../power/today .power
//   Stromkauf =../power/today .power
//   Stromverbrauch =
let nowdate = new Date().getHours();
console.log(nowdate)
let unixTimestamp = 1654334163
let milliseconds = unixTimestamp * 1000
let newdate = new Date(milliseconds)
console.log(newdate)


let headers = ["Zeit", "PV-Energie", "PV-Stromproduktion","Stromverkauf",
    "Strombezug","Stromkauf","Stromverbrauch"]
goTable()

function goTable(){
    let table = document.createElement("table")
    let trHead = document.createElement("tr")
    table.appendChild(trHead)
    for (const head of headers) {
        let thHead = document.createElement("th")
        thHead.style = "writing-mode: vertical-lr;"
        trHead.appendChild(thHead)
        thHead.innerText = head
    }
    for (let i = 0; i < 12; i++) {
        let trData = document.createElement("tr")
        for (let j = 0; j < 7; j++) {
            let tdData = document.createElement("td")
            if (j===0){
                tdData.innerText = i+1
            }else {
                tdData.innerText = Math.round(Math.random() * 100)
            }
            trData.appendChild(tdData)
        }
        table.appendChild(trData)
    }

    document.getElementById("table").appendChild(table)
}

function creatObjectData(data = {}){
    let viewdata = []
    let object = {}


}

async function getTableData(){
    let tableData = []
    let powerToday
    let PvData
    let nowHour = new Date().getHours();

    const powerFetch = await fetch('../power/today')
    if (powerFetch.status == 200){
        powerToday = await powerFetch.json()
    }


    const pvDataFetch = await fetch('../pvdata/today')
    if (pvDataFetch.status == 200){
        PvData = await pvDataFetch.json()
    }
    tableData = [powerToday,PvData]
    console.log(tableData)
    return tableData
}






