export class Device {
    id;
    name;
    nameshort;
    power;


    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getNameshort() {
        return this.nameshort;
    }

    setNameshort(value) {
        this.nameshort = value;
    }

    getPower() {
        return this.power;
    }

    setPower(value) {
        this.power = value;
    }
}