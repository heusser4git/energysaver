export class Weather {
    id;
    type;
    timestamp;
    latitude;
    longitude;
    temperatur;
    clouds;
    uvi;
    visibility;
    main;
    description;
    icon;
    sunrise;
    sunset;
    moonrise;
    moonset;
    moonphase;
    pressure;
    humidity;
    dewpoint;
    windspeed;
    winddeg;
    windgust;
    pop;
    rain;
    tempday;
    tempmin;
    tempmax;
    tempnight;
    tempeve;
    tempmorn;

    constructor(id, type, timestamp, latitude, longitude, temperatur, clouds, uvi, visibility, main, description, icon, sunrise, sunset, moonrise, moonset, moonphase, pressure, humidity, dewpoint, windspeed, winddeg, windgust, pop, rain, tempday, tempmin, tempmax, tempnight, tempeve, tempmorn) {
        this.id = id;
        this.timestamp = timestamp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.temperatur = temperatur;
        this.clouds = clouds;
        this.uvi = uvi;
        this.visibility = visibility;
        this.main = main;
        this.description = description;
        this.icon = icon;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.moonrise = moonrise;
        this.moonset = moonset;
        this.moonphase = moonphase;
        this.pressure = pressure;
        this.humidity = humidity;
        this.dewpoint = dewpoint;
        this.windspeed = windspeed;
        this.winddeg = winddeg;
        this.windgust = windgust;
        this.pop = pop;
        this.rain = rain;
        this.tempday = tempday;
        this.tempmin = tempmin;
        this.tempmax = tempmax;
        this.tempnight = tempnight;
        this.tempeve = tempeve;
        this.tempmorn = tempmorn;
        this.type = type;
    }

    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    getType() {
        return this.type;
    }

    setType(value) {
        this.type = value;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setTimestamp(value) {
        this.timestamp = value;
    }

    getLatitude() {
        return this.latitude;
    }

    setLatitude(value) {
        this.latitude = value;
    }

    getLongitude() {
        return this.longitude;
    }

    setLongitude(value) {
        this.longitude = value;
    }

    getTemperatur() {
        return this.temperatur;
    }

    setTemperatur(value) {
        this.temperatur = value;
    }

    getClouds() {
        return this.clouds;
    }

    setClouds(value) {
        this.clouds = value;
    }

    getUvi() {
        return this.uvi;
    }

    setUvi(value) {
        this.uvi = value;
    }

    getVisibility() {
        return this.visibility;
    }

    setVisibility(value) {
        this.visibility = value;
    }

    getMain() {
        return this.main;
    }

    setMain(value) {
        this.main = value;
    }

    getDescription() {
        return this.description;
    }

    setDescription(value) {
        this.description = value;
    }

    getIcon() {
        return this.icon;
    }

    setIcon(value) {
        this.icon = value;
    }

    getSunrise() {
        return this.sunrise;
    }

    setSunrise(value) {
        this.sunrise = value;
    }

    getSunset() {
        return this.sunset;
    }

    setSunset(value) {
        this.sunset= value;
    }

    getMoonrise() {
        return this.moonrise;
    }

    setMoonrise(value) {
        this.moonrise = value;
    }

    getMoonset() {
        return this.moonset;
    }

    setMoonset(value) {
        this.moonset= value;
    }

    getMoonphase() {
        return this.moonphase;
    }

    setMoonphase(value) {
        this.moonphase = value;
    }

    getPressure() {
        return this.pressure;
    }

    setPressure(value) {
        this.pressure = value;
    }

    getHumidity() {
        return this.humidity;
    }

    setHumidity(value) {
        this.humidity = value;
    }

    getDewpoint() {
        return this.dewpoint;
    }

    setDewpoint(value) {
        this.dewpoint = value;
    }

    getWindspeed() {
        return this.windspeed;
    }

    setWindspeed(value) {
        this.windspeed = value;
    }

    getWinddeg() {
        return this.winddeg;
    }

    setWinddeg(value) {
        this.winddeg = value;
    }

    getWindgust() {
        return this.windgust;
    }

    setWindgust(value) {
        this.windgust = value;
    }

    getPop() {
        return this.pop;
    }

    setPop(value) {
        this.pop = value;
    }

    getRain() {
        return this.rain;
    }

    setRain(value) {
        this.rain = value;
    }

    getTempmin() {
        return this.tempmin;
    }

    setTempmin(value) {
        this.tempmin = value;
    }

    getTempmax() {
        return this.tempmax;
    }

    setTempmax(value) {
        this.tempmax = value;
    }

    getTempnight() {
        return this.tempnight;
    }

    setTempnight(value) {
        this.tempnight = value;
    }

    getTempeve() {
        return this.tempeve;
    }

    setTempeve(value) {
        this.tempeve = value;
    }

    getTempmorn() {
        return this.tempmorn;
    }

    setTempmorn(value) {
        this.tempmorn = value;
    }


    getTempday() {
        return this.tempday;
    }

    setTempday(value) {
        this.tempday = value;
    }
}