export class HlpClass{
    static getDateFromUnix(unix) {

    }
    static getUnixFromDate(date) {

    }

    static getRandNum(vorkommastellen=2, nachkommastellen=0) {
        const vFaktor = Math.pow(10, vorkommastellen);
        const vorkomma = Number(Math.random().toString().slice(0, (2+vorkommastellen)))*vFaktor;
        const nachkomma = Number(Math.random().toString().slice(2, 2+nachkommastellen));
        if(!isNaN(Number(vorkomma + '.' + nachkomma) )) {
            return Number(vorkomma + '.' + nachkomma);
        } else {
            return this.getRandNum(vorkommastellen, nachkommastellen);
        }
    }


}