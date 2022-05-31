getWeatherData().then((weatherData)=>{
    goWeather(weatherData);
}).catch((onerror)=>{console.error(onerror)})

function goWeather(data = {}){
    let now = new Date()
    let days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donerstag", "Freitag", "Samstag"]
    let numDay = now.getDay()
    let day = numDay

    if (typeof window!== 'undefined'){
        for (let i = 0; i < 7; i++) {
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
            image.src = "http://openweathermap.org/img/wn/"+ data[i+2].icon +"@2x.png"
            divWT.className = "weather-temperatur"
            divWTmax.className = "weather-temp-max"
            divWTmin.className = "weather-temp-min"
            divWTmin.innerText  = Math.round(data[i+2].tempmin) + "°"
            divWTmax.innerText  = Math.round(data[i+2].tempmax) + "°"

            newLi.appendChild(divWD)
            newLi.appendChild(divWI).appendChild(image)
            newLi.appendChild(divWT)
            divWT.appendChild(divWTmin)
            divWT.appendChild(divWTmax)
            document.getElementById("table-weather").appendChild(newLi)
        }
    }
}

async function getWeatherData(){
    let dataWeather;
    const weatherFetch = await fetch('http://localhost:1234/wetter/daily')
    if(weatherFetch.status==200){
        dataWeather = await weatherFetch.json();
    }
    return dataWeather;
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