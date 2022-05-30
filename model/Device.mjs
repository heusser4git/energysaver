export class Device {
    id;
    name;
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

    getPower() {
        return this.power;
    }

    setPower(value) {
        this.power = value;
    }
}