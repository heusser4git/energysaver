export class Controller{
    constructor(model, view) {
        this.model = model
        this.view = view
        this.start()

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

        setInterval(()=>{
            this.intervalSlow();
        }, 150000)

        setInterval(()=>{
            this.intervalFast(device);
        }, 500)

    }

    async intervalSlow(){
        let weather = await this.model.loadWeatherData();
        let chartData = await this.model.loadChartData();

        this.view.renderWeather(weather)
        this.view.renderChart(chartData)
    }

    async intervalFast(device){
        //let device = await this.model.loadDevice();
        let pvCurrent = await this.model.loadPVCurrent();
        let powerCurrent = await this.model.loadPowerCurrent();

        this.view.renderTitel(powerCurrent,pvCurrent)
        this.view.renderDevice(device,powerCurrent)
    }


}