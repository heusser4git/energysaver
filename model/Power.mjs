export class Power {
    tstamp;
    mac;
    power;
    powerfactor;
    current;
    voltage;
    isvalid;
    total;
    totalreturned;
    phases = [];

    getTstamp() {
        return this.tstamp;
    }

    setTstamp(value) {
        this.tstamp = value;
    }

    getMac() {
        return this.mac;
    }

    setMac(value) {
        this.mac = value;
    }

    getPower() {
        return this.power;
    }

    setPower(value) {
        this.power = value;
    }

    getPowerfactor() {
        return this.powerfactor;
    }

    setPowerfactor(value) {
        this.powerfactor = value;
    }

    getCurrent() {
        return this.current;
    }

    setCurrent(value) {
        this.current = value;
    }

    getVoltage() {
        return this.voltage;
    }

    setVoltage(value) {
        this.voltage = value;
    }

    getIsvalid() {
        return this.isvalid;
    }

    setIsvalid(value) {
        this.isvalid = value;
    }

    getTotal() {
        return this.total;
    }

    setTotal(value) {
        this.total = value;
    }

    getTotalreturned() {
        return this.totalreturned;
    }

    setTotalreturned(value) {
        this.totalreturned = value;
    }

    setPhases(value) {
        this.phases = value;
    }

    getPhases() {
        return this.phases;
    }

    addPhase(value) {
        this.phases.push(value);
    }
}