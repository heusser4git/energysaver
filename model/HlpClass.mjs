export class HlpClass{

    static getDateFromUnix(unix) {
        return new Date(unix*1000)
    }

    static getUnixFromDate(date) {
        if(date instanceof Date) {
            return (date.getTime()/1000).toFixed(0);
        }
        return 0;
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

    static getUnixNow() {
        return this.getUnixFromDate(new Date());
    }

    static getUnixMorningAt(hour=6, minute=0) {
        let now = new Date();
        let timezonediff = -now.getTimezoneOffset()*60;
        now.setHours(hour);
        now.setMinutes(minute);
        now.setSeconds(0);
        return this.getUnixFromDate(now);
    }
}