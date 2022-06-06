export class Pvdata {
    id;
    timestamp;
    power;  // Current Power Production
    powerused;  // Power Used
    energy; // EToday (in Watt/h)
    efficiency;
    etotal; // ETotal (System energie produktion Total in Watt)
    eused;  // Energy used
    temperature;
    nearest5min;

    getNearest5min() {
        return this.nearest5min;
    }

    setNearest5min(value) {
        this.nearest5min = value;
    }

    getTimestamp() {
        return this.timestamp;
    }

    setTimestamp(value) {
        this.timestamp = value;
    }

    getPower() {
        return this.power;
    }

    setPower(value) {
        this.power = value;
    }

    getEnergy() {
        return this.energy;
    }

    setEnergy(value) {
        this.energy = value;
    }

    getEfficiency() {
        return this.efficiency;
    }

    setEfficiency(value) {
        this.efficiency = value;
    }

    getEtotal() {
        return this.etotal;
    }

    setEtotal(value) {
        this.etotal = value;
    }

    getTemperature() {
        return this.temperature;
    }

    setTemperature(value) {
        this.temperature = value;
    }

    getPowerused() {
        return this.powerused;
    }

    setPowerused(value) {
        this.powerused = value;
    }

    getEused() {
        return this.eused;
    }

    setEused(value) {
        this.eused = value;
    }
}