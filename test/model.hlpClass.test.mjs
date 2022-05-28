import * as assert from "assert";
import {HlpClass} from "../model/HlpClass.mjs";
describe("HelperClass", function (){
    describe("getUnixMorningAt: Get a Unixtimestamp from today at a given Number for Hour and Minute", function (){
        const generatedUnix = HlpClass.getUnixMorningAt(5,15);

        const testDate = new Date(generatedUnix*1000);

        assert.strictEqual(testDate.getHours(), 5);
        assert.strictEqual(testDate.getMinutes(), 15);
        assert.strictEqual(testDate.getDay(), new Date().getDay());
        assert.strictEqual(testDate.getMonth(), new Date().getMonth());
        assert.strictEqual(testDate.getFullYear(), new Date().getFullYear());
    });

    describe("getUnixNow: Get the Unixtimestamp from now", function (){
        const generatedUnix = HlpClass.getUnixNow();
        const now = new Date();

        assert.strictEqual(generatedUnix, (now.getTime()/1000).toFixed(0));
    });

    describe("getUnixFromDate: Get the Unixtimestamp from a Date", function (){
        const date = new Date();
        const generatedUnix = HlpClass.getUnixFromDate(date);

        assert.strictEqual(generatedUnix, (date.getTime()/1000).toFixed(0));
    });

    describe("getDateFromUnix: Get the Date from a Unixtimestamp", function (){
        const unix = 1653723210;
        const generatedDate = HlpClass.getDateFromUnix(unix);

        assert.strictEqual(generatedDate.getTime(), new Date(unix*1000).getTime());
    });


});