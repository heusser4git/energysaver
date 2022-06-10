export class Controller{
    constructor(model, view) {
        this.model = model
        this.view = view
        this.start()

        setInterval(()=>{
            this.intervalSlow();
        }, 300000)

        setInterval(()=>{
            this.intervalFast();
        }, 200000)

    }

    async start(){
        let weather = await this.model.loadWeatherData();
        let device = await this.model.loadDevice();
        let pvCurrent = await this.model.loadPVCurrent();
        let powerCurrent = await this.model.loadPowerCurrent();
        let chartData = await this.model.loadChartData();

        this.view.renderWeather(weather)
        this.view.renderTitel(powerCurrent,pvCurrent)
        this.view.renderDevice(device,powerCurrent)
        this.view.renderChart(chartData)
        this.view.renderTableHeader(chartData)
    }

    async intervalSlow(){
        let weather = await this.model.loadWeatherData();
        let chartData = await this.model.loadChartData();

        this.view.renderWeather(weather)
        this.view.renderChart(chartData)
    }

    async intervalFast(){
        // TODO Die Devices müssen nicht so oft abgeholt werden... die ändern ja "nie".
        // Die Logic ob "grün" oder "rot" kann Clientseitig gerechnet werden...
        let device = await this.model.loadDevice();
        let pvCurrent = await this.model.loadPVCurrent();
        let powerCurrent = await this.model.loadPowerCurrent();

        this.view.renderTitel(powerCurrent,pvCurrent)
        this.view.renderDevice(device,powerCurrent)
    }


}