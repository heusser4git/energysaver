export class Controller{
    constructor(model, view) {
        this.model = model
        this.view = view
        this.start()

        setInterval(()=>{
            this.interval();
        }, 3000000)

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
    async interval(){
        let weather = await this.model.loadWeatherData();
        let device = await this.model.loadDevice();
        let pvCurrent = await this.model.loadPVCurrent();
        let powerCurrent = await this.model.loadPowerCurrent();
        let chartData = await this.model.loadChartData();

        this.view.renderWeather(weather)
        this.view.renderTitel(powerCurrent,pvCurrent)
        this.view.renderDevice(device,powerCurrent)
        this.view.renderChart(chartData)
    }

}