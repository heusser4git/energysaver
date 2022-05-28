export class HlpClass{
    /**
     * Returns the Date from given Unixtimestamp
     * @param unix
     * @returns {Date}
     */
    static getDateFromUnix(unix) {
        return new Date(unix*1000)
    }

    /**
     * Returns the Unixtimestamp from given Date
     * @param date
     * @returns {string|number}
     */
    static getUnixFromDate(date) {
        if(date instanceof Date) {
            return (date.getTime()/1000).toFixed(0);
        }
        return 0;
    }

    // TODO loeschen wenn nicht gebraucht, sonst unit-Test schreiben
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

    /**
     * Returns the actual Unixtimestamp
     * @returns {*|number}
     */
    static getUnixNow() {
        return this.getUnixFromDate(new Date());
    }

    /**
     * Returns a Unixtimestamp from today at given hour an minute
     * @param hour
     * @param minute
     * @returns {*|number}
     */
    static getUnixMorningAt(hour=6, minute=0) {
        let now = new Date();
        let timezonediff = -now.getTimezoneOffset()*60;
        now.setHours(hour);
        now.setMinutes(minute);
        now.setSeconds(0);
        return this.getUnixFromDate(now);
    }
}