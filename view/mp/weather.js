
if (typeof window!== 'undefined'){
    for (let i = 0; i < 7; i++) {
        let newLi = document.createElement("li")
        let divWD = document.createElement("div")
        let divWI = document.createElement("div")
        let image = document.createElement("img")
        let divWT = document.createElement("div")

        divWD.className = "weather-day"
        divWD.innerText = "Montag"

        divWI.className = "weather-icon"
        image.src = "http://openweathermap.org/img/wn/02d@2x.png"
        divWT.className = "weather-temperatur"
        divWT.innerText = "13°/28°"

        newLi.appendChild(divWD)
        newLi.appendChild(divWI).appendChild(image)
        newLi.appendChild(divWT)
        document.getElementById("table-weather").appendChild(newLi)
    }
}




    /*
(function (){
    let tableSpawn = document.getElementById('table-weather');
    let newLi = document.createElement("li");
    let newliText = document.createTextNode("Dast ist ein Test");
    newLi.appendChild(newliText)
    tableSpawn.appendChild(newLi);
})*/
/*

 */